/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { addPokemon, getPokemons } from './axios';
import { mapper } from './mapper';
import {v4 as uuid} from 'uuid';
import BackgroundActions from 'react-native-background-actions';

const id = 1001;

const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

const App = () => {
  const [row, setRow] =  React.useState([])
  const [name, setName] = React.useState('')
  const [type, setType] = React.useState('')
  const collectionRef = React.useRef(firestore().collection('offline')).current

  React.useEffect(() => {
    refresh()
  }, [])

  const refresh = React.useCallback(() => {
    setRow([])

    async function fetchPokemon() {
      const pokemons = await getPokemons();
      if (pokemons.data) {
        const concatPokemonData = pokemons.data.filter((pokemon) => pokemon.user_id === id).map((pokemon) => ({
          ...pokemon,
          from: 'database'
        }))

        setRow((data) => {
          return [
            ...(new Set([
              ...data,
              ...concatPokemonData,
            ]))
          ]
        })
      }
    }

    async function fetchPokemonCached() {
      collectionRef
        .where('is_synced', '==', false)
        .where('user_id', '==', id)
        .onSnapshot(querySnapshot => {
          let snapshotData = []

          querySnapshot.forEach(documentSnapshot => {
            snapshotData.push({
              ...mapper(documentSnapshot),
              from: 'firestore'
            })
        });


        setRow((data) => {
          return [
            ...(new Set([
              ...data,
              ...snapshotData,
            ]))
          ]
        })
      })
    }

    Promise.all([
      fetchPokemon(),
      fetchPokemonCached()
    ])
  })

  const reset = () => {
    setType('')
    setName('')
  }

  const onSubmit = async () => {
    try {
      await addPokemon({name,
        type,
        id: uuid(),
        user_id: id
      })

      reset()
      refresh()
    } catch(e) {
      e.offlineHandler(insertToFirestore)
    }
  }

  const insertToFirestore = (errorData) => {
    const { config } = errorData;
    const data = JSON.parse(config.data)

    // TODO: insert to firestore
    collectionRef
      .doc(uuid())
      .set({
        is_synced: false,
        user_id: data.user_id,
        payload: {
          name: data.name,
          type: data.type
        }
      })
      
    triggerFirestoreOnBackground();
    reset()
  }

  const triggerFirestoreOnBackground = () => {
    BackgroundActions.start(async (taskData) => {
      console.log("-- LOOP --")
      const { delayInMs } = taskData;
      if (taskData) {
        while (BackgroundActions.isRunning()) {
          console.log('Delay terooos')

          collectionRef.get().then((snap) => {
            if (!snap.metadata.hasPendingWrites) {
              console.log('STOPPED')
              BackgroundActions.stop();
            }
          });
          
          await sleep(delayInMs);
        }
      }
    },
    {
      taskName: 'Online',
      taskTitle: 'Offline test',
      taskDesc: 'Sabar yaa, not synced',
      taskIcon: {
          name: 'ic_launcher',
          type: 'mipmap'
      },
      parameters: {delayInMs: 2000}
    }
  );
}

  return (
    <ScrollView>
      {row.map((item) => {
        return (
          <View key={item.id} style={{margin: 10, padding: 10, borderWidth: 1, borderRadius: 4, borderColor: item.from === 'database' ? 'blue' : 'red'}}>
            <Text style={{color: 'black'}}>id: {item.id}</Text>
            <Text style={{color: 'black'}}>name: {item.name}</Text>
            <Text style={{color: 'black'}}>type: {item.type}</Text>
            <Text style={{color: 'black'}}>from: {item.from}</Text>
          </View>
        )
      })}

      <Button  title="refresh" onPress={refresh}/>

      <View style={{padding: 20}}>
        <TextInput value={name} onChangeText={setName} style={styles.txInput}/>
        <TextInput value={type} onChangeText={setType} style={styles.txInput}/>
        <Button title='add new pokemon' onPress={onSubmit}/>
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  txInput: {
    height: 40,
    borderColor: 'blue',
    borderRadius: 4,
    borderWidth: 1,
    marginVertical: 5
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
