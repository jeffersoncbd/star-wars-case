import axios from 'axios'

export const swApi = axios.create({ baseURL: 'https://swapi.dev/api' })
