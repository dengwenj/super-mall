/**
 * 分类模块
 */
import type { IRootState } from '@/store/types'
import type { Module } from 'vuex'
import type { ICategoryState } from './types'

const category: Module<ICategoryState, IRootState> = {
  namespaced: true,
  state() {
    return {
      list: []
    }
  }
}

export default category
