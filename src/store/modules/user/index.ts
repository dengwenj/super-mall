/**
 * 用户模块
 */
import type { IRootState } from '@/store/types'
import { Ref } from 'vue'
import type { Module } from 'vuex'
import type { IUserState } from './types'

const user: Module<IUserState, IRootState> = {
  namespaced: true,
  state() {
    return {
      profile: {
        id: 110,
        avatar: '',
        nickname: '',
        account: '',
        mobile: null,
        token: ''
      },
      redirectUrl: '/'
    }
  },
  mutations: {
    setUser(state, payload) {
      state.profile = payload
    },
    setRedirectUrl(state, payload) {
      state.redirectUrl = payload
    }
  },
  actions: {
    async accountOrMobile({ commit }, payload: {
      accountOrMobileLogin: <T = any>(props: Record<string, any>) => Promise<T>,
      form: Ref
    }) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await payload.accountOrMobileLogin(payload.form.value)
          commit('setUser', res.result)
          resolve(res.result)
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}

export default user
