import WwMore from '@/components/lib/WwMore.vue'

import type { App } from "vue"

export default {
  install(app: App) {
    app.component(WwMore.name, WwMore)
  }
}

