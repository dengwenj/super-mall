import { createApp } from 'vue'

import router from './routes'
import store from './store'
import App from './App.vue'
import UIComponent from '@/global/component'
import directive from './global/directive'

import 'element-plus/dist/index.css'
import 'normalize.css'
import '@/assets/styles/common.less'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(UIComponent)
app.use(directive)
app.mount('#app')
