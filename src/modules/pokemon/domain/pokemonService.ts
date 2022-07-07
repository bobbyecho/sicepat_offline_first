import { Pokemon } from "./pokemonEntity";
import { PokemonRepository } from "./pokemonRepository";

export const usePokemonService = (repository: PokemonRepository) => ({
  getPokemons: (userId: number) => {
    return repository.getPokemons(userId)
  }
})