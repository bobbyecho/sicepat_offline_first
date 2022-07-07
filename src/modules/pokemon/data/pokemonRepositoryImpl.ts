import { pokemonMapper } from "../dataMapper/pokemonMapper";
import { Pokemon } from "../domain/pokemonEntity";
import { PokemonRepository } from "../domain/pokemonRepository";
import { axios } from "./http/axios";
import { recoil } from "./store/recoil";

export const usePokemonRepositoryImpl = (): PokemonRepository => {
  const getPokemons = (userId: number): { loading: boolean; failure: boolean; done: boolean; data: Pokemon[]; } => {
    let loading = false
    let failure = false;
    let done = false;
    let data: Pokemon[] = [];

    const {state, contents} = recoil.getPokemons(async() => {
      return await axios.getPokemons()
    })

    switch (state) {
      case "loading":
        loading = true
        break;
      case "hasError":
        failure = true;
        break;
      case "hasValue":
        data = pokemonMapper.toEntities(contents, userId)
    }

    return {
      loading,
      failure,
      done,
      data
    }
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