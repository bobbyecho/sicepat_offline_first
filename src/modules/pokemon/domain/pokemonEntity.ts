import { PokemonOffline, PokemonHttp } from "../data/pokemonModel";

export type PokemonUserId = number;

export interface Pokemon {
  id: string;
  userId: PokemonUserId;
  name: string;
  type: string;
  from: string;
}

export const filterPokemonById = (pokemons: Pokemon[], userId: PokemonUserId) => {
  return pokemons.filter((pokemon) => pokemon.userId === userId);
}