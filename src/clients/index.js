import axios from 'axios'
import { getAccessToken } from '../helpers'

const API = axios.create({
  baseURL: `${process.env.API_GATEWAY_URL}/chat`,
  withCredentials: true,
  headers: {
    Accept: 'application/json;',
    common: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  },
  emulateJSON: true,
})

API.interceptors.request.use(async config => {
  const accessToken = await getAccessToken()

  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`

  return config
})

export default API
