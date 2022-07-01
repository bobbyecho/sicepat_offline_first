/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {v4 as uuid} from 'uuid';
import { getPokemons } from './axios';
import { mapper } from './mapper';
import { useNetwork } from './useNetwork';
import BackgroundActions from 'react-native-background-actions';

const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

const App = () => {
  const [row, setRow] =  React.useState([])
  const [name, setName] = React.useState('')
  const [type, setType] = React.useState('')
  const collectionRef = React.useRef(firestore().collection('offline')).current
  const { isOnline } = useNetwork()

  React.useEffect(() => {
    refresh()
  }, [])

  const refresh = () => {
    setRow([])

    async function fetchPokemon() {
      const pokemons = await getPokemons();
      if (pokemons.data) {
        const concatPokemonData = pokemons.data.map((pokemon) => ({
          ...pokemon,
          from: 'database'
        }))

        setRow((data) => {
          return [
            ...data,
            ...concatPokemonData
          ]
        })
      }
    }

    async function fetchPokemonCached() {
      collectionRef
        .where('user_id', '==', '1010').onSnapshot(querySnapshot => {
        let snapshotData = []

        querySnapshot.forEach(documentSnapshot => {
          snapshotData.push({
            ...mapper(documentSnapshot),
            from: 'firestore'
          })
        });

        console.log(snapshotData)

        setRow((data) => {
          return [
            ...data,
            ...snapshotData,
          ]
        })
      })
    }

    Promise.all([
      fetchPokemonCached()
    ])
  }

  const reset = () => {
    setType('')
    setName('')
  }

  const onSubmit = async () => {
    await BackgroundActions.start(
      async (taskData) => {
          const { delayInMs } = taskData;

          if (taskData) {
              while (BackgroundActions.isRunning()) {
                   await collectionRef.get({ source: 'cache' }).then((snap) => {
                    if (snap.metadata.hasPendingWrites) {
                      BackgroundActions.stop();
                    }
                   })
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
          // linkingURI: getUriScheme, // See Deep Linking for more info
          parameters: {delayInMs: 2000}
      }
  );
    if (!isOnline) {
      collectionRef
          .doc(uuid())
          .set({
            is_synced: false,
            payload: {
              name,
              type
            }
          })
          .then(() => {
            console.log("pokemon added")
          })

      reset()
    } else {
      Alert.alert('Online, ga bisa submit')
    }
  }

  return (
    <View>
      {row.map((item) => {
        return (
          <View key={item.id} style={{margin: 10, padding: 10, borderWidth: 1, borderRadius: 4, borderColor: 'blue'}}>
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
    </View>
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
