/**
 * 分类模块
 */
import { topCategory } from '@/global/constants'
import { getAllCategory } from '@/services/api/category'

import type { IRootState } from '@/store/types'
import type { Module } from 'vuex'
import type { ICategoryState } from './types'

const category: Module<ICategoryState, IRootState> = {
  namespaced: true,
  state() {
    return {
      // 全部分类
      list: topCategory.map((item) => ({ name: item }))
    }
  },
  mutations: {
    setList(state, payload) {
      state.list = payload
    }
  },
  actions: {
    async getList({ commit }) {
      const data = await getAllCategory()
      commit('setList', data.result)
    }
  }
}

export default category
