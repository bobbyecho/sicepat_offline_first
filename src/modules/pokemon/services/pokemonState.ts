import { atom } from "recoil";
import { Pokemon } from "../domain/pokemonEntity";

export const PokemonState = atom<Pokemon[]>({
  key: 'pokemons',
  default: []
})