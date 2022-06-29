export const mapper = (snapshot: any) => {
  return {
    id: snapshot.id,
    name: snapshot.data().payload.name,
    type: snapshot.data().payload.type
  }
}