import { selector, useRecoilValueLoadable } from "recoil";
import { PokemonHttp } from "../../pokemonModel";

export const Pokemons = (callback: () => Promise<PokemonHttp[]>) => selector({
  key: 'pokemons',
  get: async () => {
    return await callback()
  }
})

export const getPokemons = (callback: () => Promise<PokemonHttp[]>) => {
  return useRecoilValueLoadable(Pokemons(callback))
}