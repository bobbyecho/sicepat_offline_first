import { pokemonAdapter } from "../adapter/pokemonAdapter";
import { usePokemonRepositoryImpl } from "../data/pokemonRepositoryImpl";
import { PokemonUserId } from "../domain/pokemonEntity";
import { pokemonService } from "../domain/pokemonService";

const usePokemonAdapter = pokemonAdapter()

export const useGetPokemon = (userId: PokemonUserId) => {
  usePokemonAdapter.getPokemons(userId)
}