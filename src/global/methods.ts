import store from "@/store"

import type { App } from "vue"

const handleClickProduct = () => {
  store.commit('category/setCategoryId', 'activeFalse')
}

export default {
  install(app: App) {
    app.provide('handleClickProduct', handleClickProduct)
  }
}
