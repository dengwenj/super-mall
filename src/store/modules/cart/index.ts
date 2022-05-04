/**
 * 购物车模块
 */
import type { IStore } from '@/store/types'
import type { Module } from 'vuex'
import type { ICartState, IListItem } from './types'

const cart: Module<ICartState, IStore> = {
  namespaced: true,
  state() {
    return {
      list: []
    }
  },
  mutations: {
    addCart(state, payload: IListItem) {
      // 原先是否加入过
      const itemIdx = state.list.findIndex((item) => item.skuId === payload.skuId)
      if (itemIdx !== -1) {
        payload.count += state.list[itemIdx].count
        state.list.splice(itemIdx, 1)
      }
      
      state.list.unshift(payload)
    }
  },
  actions: {
    addCart({ commit, rootState }, payload: IListItem) {
      return new Promise((resolve, reject) => {
        if (rootState.user.profile?.token) {
          
        } else {
          commit('addCart', payload)
          resolve('加入本地成功')
        }
      })
    }
  }
}

export default cart
