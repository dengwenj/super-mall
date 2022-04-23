import axios from 'axios'

import { useStore } from '@/store'
import router from '@/routes'
import { baseURL } from '../../address'

const store = useStore()

const instance = axios.create({
  baseURL,
  timeout: 10000
})

instance.interceptors.request.use((config) => {
  const { token } = store.state.user.profile
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`
  }
  return config
}, (err) => {
  return Promise.reject(err)
})

instance.interceptors.response.use((response) => {
  return response.data
}, (err) => {
  if (err.response && err.response.status === 401) {
    // 清空用户数据
    store.commit('user/setUser', {})
    // 跳转到登录页
    const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
    router.push(`/login?redirectUrl=${fullPath}`)
  }
  return Promise.reject(err)
})

export default instance
