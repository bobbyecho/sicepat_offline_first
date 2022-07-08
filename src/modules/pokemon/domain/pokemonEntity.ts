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

export const createPokemon = (pokemon: Pokemon): PokemonHttp => {
  return {
    id: pokemon.id,
    name: pokemon.name,
    type: pokemon.type,
    user_id: pokemon.userId
  }
}

export const createPokemonOffline = (pokemon: Pokemon): PokemonOffline => {
  return {
    id: pokemon.id,
    is_synced: false,
    payload: {
      name: pokemon.name,
      type: pokemon.type
    },
    user_id: pokemon.userId
  }
}