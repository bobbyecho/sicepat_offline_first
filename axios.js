import Axios from 'axios'

const axios = Axios.create({
  baseURL: 'https://floating-spire-62962.herokuapp.com'
})

const getPokemons = () => {
  return axios.get('/api/pokemons')
}

export {
  getPokemons
}