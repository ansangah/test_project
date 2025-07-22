import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/routes.ts'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')