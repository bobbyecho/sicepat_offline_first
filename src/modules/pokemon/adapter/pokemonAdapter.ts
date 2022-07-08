import { pokemonRepositoryImpl } from "../data/pokemonRepositoryImpl"
import { PokemonUserId } from "../domain/pokemonEntity"
import { PokemonRepository } from "../domain/pokemonRepository"
import { getPokemons } from "./store/recoil/pokemon"

const pokemonRepository = pokemonRepositoryImpl()

export const usePokemon = () => ({
  getPokemons: (userId: PokemonUserId) => {
    return pokemonRepository.getPokemons(userId);
  }
})