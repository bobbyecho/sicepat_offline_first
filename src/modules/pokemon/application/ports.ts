import { Pokemon, PokemonUserId } from "../domain/pokemonEntity";

export interface PokemonService {
  Pokemons(): Pokemon[];
  fetchPokemons(userId: PokemonUserId): void;
  addPokemon(pokemon: Pokemon): void;
}