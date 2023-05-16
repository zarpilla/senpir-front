import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import App from './App.vue'
import router from './router'


import './assets/main.css'
// import './registerServiceWorker'

const pinia = createPinia()
pinia.use(piniaPersist)

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
