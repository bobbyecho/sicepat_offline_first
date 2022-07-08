import { useRecoilValue } from "recoil"
import { Pokemon } from "../domain/pokemonEntity"

let store: Pokemon[] = {}

export const usePokemonStorage = () => {
  return useRecoilValue(pokemons)
}