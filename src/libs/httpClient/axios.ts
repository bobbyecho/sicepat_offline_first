import Axios from 'axios'
import httpClientWithOfflineHandler from "./offlineHandler";

const axios = Axios.create({
  baseURL: 'https://floating-spire-62962.herokuapp.com'
})

const axiosWithOffline = httpClientWithOfflineHandler(axios);

export {axios, axiosWithOffline}