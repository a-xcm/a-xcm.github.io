
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Layout from './components/layout/index.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


import App from './App.vue'
import router from './router'

import './mock'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.component('Layout', Layout)
app.mount('#app')
