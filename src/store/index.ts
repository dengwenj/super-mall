import { createStore, useStore as useVuexStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import { user, cart, category } from './modules'

import type { Store } from 'vuex'
import type { IRootState, IStore } from './types'

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
      paths: ['user', 'cart', 'category']
    })
  ]
})

export const useStore = (): Store<IStore> => useVuexStore()

export default store
