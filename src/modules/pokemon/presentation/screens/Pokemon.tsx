import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { usePokemon } from '../../application/usePokemon';

const userId = 1001;

const Pokemon = () => {
  const {fetchPokemons, Pokemons} = usePokemon();
  const pokemons = Pokemons();
  
  React.useEffect(() => {
    fetchPokemons(1001)
  }, [])

  return pokemons.length ? (
    <ScrollView>
        {pokemons.map((item) => {
          return (
            <View key={item.id} style={{margin: 10, padding: 10, borderWidth: 1, borderRadius: 4, borderColor: item.from === 'database' ? 'blue' : 'red'}}>
              <Text style={{color: 'black'}}>id: {item.id}</Text>
              <Text style={{color: 'black'}}>name: {item.name}</Text>
              <Text style={{color: 'black'}}>type: {item.type}</Text>
              <Text style={{color: 'black'}}>from: {item.from}</Text>
            </View>
          )
        })}
    </ScrollView>
  ) : null
}

export {Pokemon}


// <Button  title="refresh" onPress={refresh}/>

// <View style={{padding: 20}}>
//   <TextInput value={name} onChangeText={setName} style={styles.txInput}/>
//   <TextInput value={type} onChangeText={setType} style={styles.txInput}/>
//   <Button title='add new pokemon' onPress={onSubmit}/>
// </View>