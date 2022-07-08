import { Firestore } from "../../../../../libs/liveData/firestore";
import { Pokemon } from "../../../domain/pokemonEntity";
import { PokemonOffline } from "../../pokemonModel";

const OfflineInstance = Firestore.collection('offline');

export const firestore = {
  getPokemons: async (userId: number) => {
    let snapshotData: PokemonOffline[] = []

    OfflineInstance
      .where('is_synced', '==', false)
      .where('user_id', '==', userId)
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          snapshotData.push({
            id: documentSnapshot.id,
            is_synced: false,
            user_id: documentSnapshot.data().user_id,
            payload: {
              name: documentSnapshot.data().payload.name,
              type: documentSnapshot.data().payload.type,
            }
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