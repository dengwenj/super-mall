/**
 * 购物车模块
 */
import type { IRootState } from '@/store/types'
import type { Module } from 'vuex'
import type { ICartState } from './types'

const cart: Module<ICartState, IRootState> = {
  namespaced: true,
  state() {
    return {
      list: []
    }
  }
}

export default cart
