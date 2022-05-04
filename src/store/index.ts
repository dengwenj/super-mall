import { createStore, useStore as useVuexStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import { user, cart, category } from './modules'

import type { Store } from 'vuex'
import type { IRootState, IStore } from './types'

const store = createStore<any>({
  // state: {
  //   count: 0
  // },
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

export const useStore = (): Store<IStore> => useVuexStore()

export default store
