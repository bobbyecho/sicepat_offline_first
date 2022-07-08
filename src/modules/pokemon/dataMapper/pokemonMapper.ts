import { PokemonOffline, PokemonHttp } from "../data/pokemonModel";
import { Pokemon } from "../domain/pokemonEntity"; 

export const pokemonMapper = {
  toEntity: ({id, payload, user_id}: PokemonOffline): Pokemon => {
    return {
      id,
      from: 'firestore',
      userId: user_id,
      name: payload.name,
      type: payload.type
    }
  },
  toFirestore: ({id, name, type, userId}: Pokemon): PokemonOffline => {
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
  firestoreToEntities: (pokemons: PokemonFirestore[]): Pokemon[] => {
    return pokemons.map(({id, payload, user_id}) => ({
      id,
      from: 'firestore',
      name: payload.name,
      type: payload.type,
      userId: user_id
    }))
  },
  httpToEntities: (pokemons: PokemonHttp[], userId: number): Pokemon[] => {
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
  }
}