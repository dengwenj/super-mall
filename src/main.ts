import { createApp } from 'vue'
import 'element-plus/dist/index.css'

import router from './routes'
import store from './store'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
