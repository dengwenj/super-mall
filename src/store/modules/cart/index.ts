/**
 * 购物车模块
 */
import { 
  getNewGoodsBySkuId,
  mergeCartGoods,
  getCartList, 
  addCartGoods,
  removeCartGoods,
  updateCartGoods,
  allCheckSelected
} from '@/services/api/cart'

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
      if (Object.keys(payload).includes('skuId')) {
        const goods = state.list.find((item) => item.skuId === payload.skuId)
        if (goods) {
          for (const key in payload) {
            if (payload[key] !== null && payload !== '') {
              (goods as any)[key] = payload[key]
            }
          }
        }
        return
      }

      // payload 对象里面没有 skuId 属性，是否全选
      state.list.forEach((item) => item.selected = payload.selected)
    },
    removeGoods(state, skuId) {
      state.list.splice(
        state.list.findIndex((item) => item.skuId === skuId),
        1
      )
    },
    // 批量删除
    batchRemoveGoods(state, payload) {
      state.list = payload
    },
    setList(state, payload) {
      state.list = payload
    }
  },
  actions: {
    addCart({ commit, rootState }, payload: IListItem) {
      return new Promise(async (resolve, reject) => {
        if (rootState.user.profile?.token) {
          await addCartGoods({ skuId: payload.skuId, count: payload.count })
          commit('addCart', payload)
          resolve('加入购物车成功')
        } else {
          commit('addCart', payload)
          resolve('加入本地成功')
        }
      })
    },
    getNewGoods({ commit, rootState, state }, payload) {
      return new Promise(async (resolve, reject) => {
        if (rootState.user.profile?.token) {
          // 获取登录的购物车列表
          const res = await getCartList()
          commit('setList', res.result)
          // resolve('')
        } else {
          // 用 Promise.all 同时发送请求，统一处理
          const promiseList = state.list.map((item) => {
            return getNewGoodsBySkuId(item.skuId)
          })
          const newGoodsList = await Promise.all(promiseList)

          newGoodsList.forEach((item, idx) => {
            commit('updateGoods', { skuId: state.list[idx].skuId, ...item.result })
          })
          resolve('购物车本地商品更新成功')
        }
      })
    },
    removeGoods({ commit, rootState }, skuId) {
      return new Promise(async (resolve, reject) => {
        if (rootState.user.profile?.token) {
          await removeCartGoods({ ids: [skuId] })
          commit('removeGoods', skuId)
          resolve('删除成功')
        } else {
          commit('removeGoods', skuId)
          resolve('删除成功')
        }
      })
    },
    updateGoods({ commit, rootState, state }, payload: Record<string, any>) {
      return new Promise(async (resolve, reject) => {
        if (rootState.user.profile?.token) {
          if (Object.keys(payload).includes('skuId')) {
            await updateCartGoods(payload.skuId, { [Object.keys(payload)[1]]: payload[Object.keys(payload)[1]] })
          } else {
            const allSkuIdList = state.list.map((item) => item.skuId)
            await allCheckSelected({ selected: payload.selected, ids: allSkuIdList })
          }
          commit('updateGoods', payload)
          resolve('修改成功')
        } else {
          commit('updateGoods', payload)
          resolve('修改成功')
        }
      })
    },
    // 批量删除
    batchRemoveGoods({ commit, rootState, getters }, isClearInvalidGoods: boolean) {
      return new Promise(async (resolve, reject) => {
        // 提到顶部
        const GoodsSelectedWithFalseList = getters.validList.filter((item: IListItem) => !item.selected)

        if (rootState.user.profile?.token) {
          if (!isClearInvalidGoods) {
            const removeSkuIdList = getters.validList
              .filter((item: IListItem) => item.selected)
              .map((item: IListItem) => item.skuId)
            await removeCartGoods({ ids: removeSkuIdList })
            commit('batchRemoveGoods', GoodsSelectedWithFalseList)
          } else {
            const clearInvalidGoodsSKuIdList = getters.invalidList.map((item: IListItem) => item.skuId)
            await removeCartGoods({ ids: clearInvalidGoodsSKuIdList, clearInvalid: isClearInvalidGoods })
            commit('batchRemoveGoods', getters.validList)
          }
          resolve('批量删除成功') 
        } else {
          // 批量删除已选中的
          if (!isClearInvalidGoods) {
            commit('batchRemoveGoods', GoodsSelectedWithFalseList)
          } else {
            commit('batchRemoveGoods', getters.validList)
          }
          resolve('批量删除成功') 
        }
      })
    },
    // 修改sku规格函数
    updateCartSku (ctx, { oldSkuId, newSku }) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile?.token) {
          const oldGoods = ctx.state.list.find(item => item.skuId === oldSkuId)
          removeCartGoods({ ids: [oldSkuId] }).then(() => {
            return addCartGoods({ skuId: newSku.skuId, count: oldGoods!.count })
          }).then(() => {
            return getCartList()
          }).then((data) => {
            ctx.commit('setList', data.result)
            resolve('修改规格成功')
          })
        } else {
          // 1. 获取旧的商品信息
          const oldGoods = ctx.state.list.find(item => item.skuId === oldSkuId)
          // 2. 删除旧的商品
          ctx.commit('removeGoods', oldSkuId)
          // 3. 合并一条新的商品信息
          const { skuId, price: nowPrice, inventory: stock, specsText: attrsText } = newSku
          const newGoods = { ...oldGoods, skuId, nowPrice, stock, attrsText }
          // 4. 去插入即可
          ctx.commit('addCart', newGoods)
        }
      })
    },
    // 合并购物车
    mergeCart({ commit, state }) {
      return new Promise(async (resolve, reject) => {
        const goodsListMap = state.list.map((item: IListItem) => {
          return {
            skuId: item.skuId,
            selected: item.selected,
            count: item.count
          }
        })
        await mergeCartGoods(goodsListMap)
        // 合并成功把本地的清除
        commit('setList', [])
        resolve('合并成功')
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
      return getters.validList.reduce((pre: number, item: IListItem) => pre + Number(item.count), 0)
    },
    // 符合列表的总金额
    validAllPrice(state, getters) {
      return getters.validList.reduce((pre: number, item: IListItem) => pre + (item.nowPrice as any * Number(item.count)), 0).toFixed(2)
    },
    // 无效商品列表
    invalidList(state) {
      return state.list.filter((item) => !(item.stock > 0 && item.isEffective))
    },
    // 已选商品列表
    selectedList(state, getters) {
      return getters.validList.filter((item: IListItem) => item.selected)
    },
    // 已选商品总件数
    selectedTotal(state, getters) {
      return getters.selectedList.reduce((pre: number, item: IListItem) => pre + Number(item.count), 0)
    },
    // 已选商品总金额
    selectedAllPrice(state, getters) {
      return getters.selectedList.reduce((pre: number, item: IListItem) => pre + Number(item.count) * (item.nowPrice as any), 0).toFixed(2)
    },
    // 是否全选
    isCheckAll(state, getters) {
      return getters.validList.length === getters.selectedList.length && getters.validList.length !== 0
    }
  }
}

export default cart
