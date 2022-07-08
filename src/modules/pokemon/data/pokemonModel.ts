export interface PokemonOffline {
  id: string;
  is_synced: boolean;
  user_id: number;
  payload: {
    name: string;
    type: string
  }
}

export interface PokemonHttp {
  id: string;
  user_id: number;
  name: string;
  type: string;
}