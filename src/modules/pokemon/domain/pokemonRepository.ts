import { Pokemon } from "./pokemonEntity";

export interface PokemonRepository {
  fetchPokemons(userId: number): Promise<Pokemon[]>;
  addPokemon(pokemon: Pokemon): Promise<void>;
}