import { createStore, Store, useStore as useVuexStore } from 'vuex'

const store = createStore({
  state: {
    count: 0
  }
})

export const useStore = <T = any>(): Store<T> => useVuexStore()

export default store
