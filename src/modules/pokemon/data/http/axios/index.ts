import { axios as axiosInstance, axiosWithOffline } from "../../../../../libs/httpClient/axios"
import { Pokemon } from "../../../domain/pokemonEntity";
import { PokemonHttp } from "../../pokemonModel";

const axios = {
  getPokemons: async (): Promise<PokemonHttp[]> => {
      const pokemons = await axiosInstance.get('/api/pokemons')
      return pokemons.data;
  },
  addPokemon: (payload: Pokemon) => {
    axiosWithOffline.post('api/pokemons', { ...payload})
  }
}

export {axios}