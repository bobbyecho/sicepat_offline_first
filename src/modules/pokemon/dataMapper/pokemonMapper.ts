import { PokemonFirestore, PokemonHttp } from "../data/pokemonModel";
import { Pokemon } from "../domain/pokemonEntity";

export const pokemonMapper = {
  toEntity: ({id, payload, user_id}: PokemonFirestore): Pokemon => {
    return {
      id,
      from: 'firestore',
      userId: user_id,
      name: payload.name,
      type: payload.type
    }
  },
  toFirestore: ({id, name, type, userId}: Pokemon): PokemonFirestore => {
    return {
      id,
      is_synced: false,
      user_id: userId,
      payload: {
        name,
        type
      }
    }
  },
  toEntities: (pokemons: PokemonHttp[], userId: number): Pokemon[] => {
    return pokemons
      .map(({id, name, type, user_id}) => ({
        id,
        name,
        type,
        userId: user_id,
        from: 'database',
      }))
      .filter((pokemon) => pokemon.userId === userId)
  },
  toHttp: ({id, name, type, userId}: Pokemon): PokemonHttp => {
    return {
      id,
      name,
      type,
      user_id: userId
    }
  },
  filterByUserId: (pokemon: Pokemon, userId: number): boolean => {
    return pokemon.userId === userId
  }
}