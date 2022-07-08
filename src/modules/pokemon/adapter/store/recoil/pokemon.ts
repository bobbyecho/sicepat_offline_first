import { atom, selector, useRecoilValueLoadable, } from "recoil";
import { PokemonHttp } from "../../../data/pokemonModel";
import { pokemonRepositoryImpl } from "../../../data/pokemonRepositoryImpl";
import { Pokemon } from "../../../domain/pokemonEntity";

const pokemonRepository = pokemonRepositoryImpl()

const Pokemon = atom<Pokemon[]>({
  key: 'pokemons',
  default: []
})
export const Pokemons = (userId: number) => selector({
  key: 'pokemons',
  get: async () => {
    return pokemonRepository.getPokemons(userId)
  }
})

export const getPokemons = (userId: number) => {
  return useRecoilValueLoadable(getPokemons(userId))
}

// const {state, contents} = recoil.getPokemons(async() => [
  //   axios.getPokemons,
  // ])

  // switch (state) {
  //   case "loading":
  //     loading = true
  //     break;
  //   case "hasError":
  //     failure = true;
  //     break;
  //   case "hasValue":
  //     data = contents
  // }

  // return {
  //   loading,
  //   failure,
  //   done,
  //   data
  // }
  // return useRecoilValueLoadable(Pokemons(...callback))