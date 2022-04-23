import axios from 'axios'

import { useStore } from '@/store'
import { baseURL } from '../../address'

const store = useStore()

const request = axios.create({
  baseURL,
  timeout: 10000
})

request.interceptors.request.use((config) => {
  const { token } = store.state.user.profile
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`
  }
  
  return config
}, (err) => {
  return Promise.reject(err)
})

export default request
