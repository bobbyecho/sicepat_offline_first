import { Pokemon } from "../domain/pokemonEntity";
import { usePokemonService } from "../services/pokemonService"

export const usePokemon = () => {
  const pokemonService = usePokemonService()

  const Pokemons = () => pokemonService.Pokemons();

  const addPokemon = (pokemon: Pokemon) => {
    pokemonService.addPokemon(pokemon)
  }

  return {
    Pokemons,
    addPokemon,
    fetchPokemons: pokemonService.fetchPokemons,
  }
}