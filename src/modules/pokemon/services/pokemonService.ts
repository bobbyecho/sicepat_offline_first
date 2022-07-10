import { useRecoilCallback, useRecoilValue } from "recoil"
import { PokemonService } from "../application/ports"
import { pokemonRepositoryImpl } from "../data/pokemonRepositoryImpl"
import { Pokemon, PokemonUserId } from "../domain/pokemonEntity"
import { PokemonState } from "./pokemonState"

const pokemonRepository = pokemonRepositoryImpl()

export const usePokemonService = (): PokemonService => {
  const Pokemons = () => useRecoilValue(PokemonState);

  const fetchPokemons = (userId: PokemonUserId) => {
    useRecoilCallback(({set}) => async () => {
      const pokemonResponse = await pokemonRepository.fetchPokemons(userId)
      set(PokemonState, pokemonResponse)
    })
  }

  const addPokemon = (pokemon: Pokemon) => {
    throw Error("method not implmented")
  }

  return {
    fetchPokemons,
    Pokemons,
    addPokemon
  }
}