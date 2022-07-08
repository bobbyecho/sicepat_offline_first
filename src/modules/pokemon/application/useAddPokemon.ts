import React from "react"
import { Pokemon } from "../domain/pokemonEntity"

const useAddPokemon = () => {
  const [pokemon, setPokemon] = React.useState<Pokemon>()

  const submitPokemon = () => {
    // do with pokemon
  }

  return {
    pokemon,
    setPokemon,
    submitPokemon
  }
}