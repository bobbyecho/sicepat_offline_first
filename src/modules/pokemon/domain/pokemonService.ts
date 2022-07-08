import { PokemonRepository } from "./pokemonRepository";

export const pokemonService = (repository: PokemonRepository) => ({
  getPokemons: (userId: number) => {
    return repository.getPokemons(userId)
  }
})