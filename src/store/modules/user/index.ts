/**
 * 用户模块
 */
import type { IRootState } from '@/store/types'
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
      }
    }
  },
  mutations: {
    updateId(state, payload) {
      state.profile.id = payload.id
    }
  }
}

export default user
