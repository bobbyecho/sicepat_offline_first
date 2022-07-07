import { Firestore } from "../../../../../libs/liveData/firestore";
import { Pokemon } from "../../../domain/pokemonEntity";
import { PokemonRepository } from "../../../domain/pokemonRepository";

const OfflineInstance = Firestore.collection('offline');

export const firestore = {
  getPokemons: async (userId: string) => {
    let snapshotData: Pokemon[] = []

    OfflineInstance
      .where('is_synced', '==', false)
      .where('user_id', '==', userId)
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          snapshotData.push({
            ...documentSnapshot,
            from: 'firestore'
          })
      })
    });

    return Promise.resolve(snapshotData);
  },
  addPokemon: ({id, name, type, userId}: Pokemon) => {
    OfflineInstance.doc(id).set({
      is_synced: false,
      user_id: userId,
      payload: {
        name,
        type
      }
    })
  }
}