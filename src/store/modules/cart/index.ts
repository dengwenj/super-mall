/**
 * 购物车模块
 */
import { getNewGoodsBySkuId } from '@/services/api/cart'

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
    },
    updateGoods(state, payload) {
      const goods = state.list.find((item) => item.skuId === payload.skuId)
      if (goods) {
        for (const key in payload) {
          if (payload[key] !== null && payload !== '') {
            (goods as any)[key] = payload[key]
          }
        }
      }
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
    },
    getNewGoods({ commit, rootState, state }, payload) {
      return new Promise(async (resolve, reject) => {
        if (rootState.user.profile?.token) {
          
        } else {
          // 用 Promise.all 同时发送请求，统一处理
          const promiseList = state.list.map((item) => {
            return getNewGoodsBySkuId(item.skuId)
          })
          const newGoodsList = await Promise.all(promiseList)
          console.log(newGoodsList)
          newGoodsList.forEach((item, idx) => {
            commit('updateGoods', { skuId: state.list[idx].skuId, ...item.result })
          })
          resolve('购物车本地商品更新成功')
        }
      })
    }
  },
  getters: {
    // 符合的列表
    validList(state) {
      return state.list.filter((item) => item.stock > 0 && item.isEffective)
    },
    // 符合列表的总件数
    validTotal(state, getters) {
      return getters.validList.reduce((pre: number, item: IListItem) => pre + item.count, 0)
    },
    // 符合列表的总金额
    validAllPrice(state, getters) {
      return getters.validList.reduce((pre: number, item: IListItem) => pre + (item.nowPrice as any * item.count), 0).toFixed(2)
    }
  }
}

export default cart
