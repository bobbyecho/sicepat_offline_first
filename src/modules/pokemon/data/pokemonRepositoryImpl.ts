import { pokemonMapper } from "../dataMapper/pokemonMapper";
import { Pokemon } from "../domain/pokemonEntity";
import { PokemonRepository } from "../domain/pokemonRepository";
import { axios } from "./http/axios";
import { firestore } from "./offline/firestore";

export const pokemonRepositoryImpl = (): PokemonRepository => {
  const getPokemons = async (userId: number): Promise<Pokemon[]> => {

    const [pokeFirestore, pokeHttp] = await Promise.all([
      pokemonMapper.firestoreToEntities(await firestore.getPokemons(userId)),
      pokemonMapper.httpToEntities(await axios.getPokemons(), userId)
    ])

    return [
      ...pokeFirestore,
      ...pokeHttp
    ]
  }

  return {
    getPokemons
  }
}

// import { PokemonHttp } from "./http/axios"
// import { PokemonFirestore } from "./datasource/PokemonFirestore"
// import { PokemonListMapper } from "./pokemonMapper"

// const PokemonRepository = () => {
//   const listMapper = PokemonListMapper();

//   const getAllPokemon = async (user_id) => {
//     const pokemons = await PokemonHttp().getPokemons(user_id)
//     const cachedPokemons = await PokemonFirestore().getPendingPokemons(user_id)

//     const mapPokemons = listMapper.listFromHttp(pokemons)
//     const mapCachedPokemons = listMapper.listFromFirestore(cachedPokemons);

//     return [
//       ...mapPokemons,
//       ...mapCachedPokemons
//     ]
//   }

//   return {
//     getAllPokemon
//   }
// }

// const PokemonListMapper = () => {
//   const listFromFirestore = (pokemons) => {
//     return pokemons.map((pokemon) => {
//       return {
//         id: pokemon.id,
//         userId: pokemon.data().user_id,
//         name: pokemon.data().payload.name,
//         type: pokemon.data().payload.type,
//       }
//     })
//   }

//   const listFromHttp = (pokemons) => {
//     return pokemons.map((pokemon) => {
//       return {
//         id: pokemon.id,
//         userId: pokemon.user_id,
//         name: pokemon.type,
//         type: pokemon.type
//       }
//     })
//   }

//   return {
//     listFromFirestore,
//     listFromHttp
//   }
// }

// export {PokemonListMapper}