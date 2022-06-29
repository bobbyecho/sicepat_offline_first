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

const App = () => {
  const [row, setRow] =  React.useState([])
  const [name, setName] = React.useState('')
  const [type, setType] = React.useState('')
  const collectionRef = React.useRef(firestore().collection('offline')).current
  const { isOnline } = useNetwork()

  React.useEffect(() => {
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
        .where('is_synced', '==', false).onSnapshot(querySnapshot => {
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
      fetchPokemon(),
      fetchPokemonCached()
    ])
  }, [])

  const reset = () => {
    setType('')
    setName('')
  }

  const onSubmit = () => {
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
