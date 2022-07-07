import { Pokemon } from "./pokemonEntity";

export interface PokemonRepository {
  getPokemons(userId: number): {
    loading: boolean;
    failure: boolean;
    done: boolean;
    data: Pokemon[]
  }
}