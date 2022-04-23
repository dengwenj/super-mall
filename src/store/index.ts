import { createStore, Store, useStore as useVuexStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import { user, cart, category } from './modules'

import type { IRootState } from './types'

const store = createStore<IRootState>({
  state: {
    count: 0
  },
  modules: {
    user,
    cart,
    category
  },
  plugins: [
    createPersistedState({
      key: 'super-mall',
      paths: ['user', 'cart']
    })
  ]
})

export const useStore = <T = any>(): Store<T> => useVuexStore()

export default store
