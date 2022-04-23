import axios from 'axios'
import { ElMessage } from 'element-plus'

import store from '@/store'
import router from '@/routes'
import { baseURL } from '../../address'

import type { AxiosRequestConfig } from 'axios'

export default function request<T = any>(options: AxiosRequestConfig): Promise<T> {
  return new Promise(async (resolve, reject) => {
    const instance = axios.create({
      baseURL,
      timeout: 10000
    })

    // 请求拦截
    instance.interceptors.request.use((config) => {
      const superMall = JSON.parse(localStorage.getItem('super-mall') || '')
      const { token } = superMall.user.profile
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`
      }
      return config
    }, (err) => {
      return Promise.reject(err)
    })

    // 响应拦截
    instance.interceptors.response.use((response) => {
      return response.data
    }, (err) => {
      if (err.response && err.response.status === 401) {
        // 清空用户数据
        store.commit('user/setUser', {})
        // 跳转到登录页
        const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
        router.push(`/login?redirectUrl=${fullPath}`)
      } else if (err.response && err.response.status >= 500) {
        ElMessage({
          message: '网络出问题啦~',
          type: 'error'
        })
      }
      return Promise.reject(err)
    })

    try {
      const res = await instance.request<any, T, any>(options)
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}
