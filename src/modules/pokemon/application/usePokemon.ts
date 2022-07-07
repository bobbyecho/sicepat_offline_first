import { usePokemonRepositoryImpl } from "../data/pokemonRepositoryImpl";
import { usePokemonService } from "../domain/pokemonService";

export const usePokemon = () => {
  const pokemonImpl = usePokemonRepositoryImpl();
  const pokemonService = usePokemonService(pokemonImpl);

  const getPokemons = (userId: number) => {
    return pokemonService.getPokemons(userId);
  }

  return {
    getPokemons
  }
}