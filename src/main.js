import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import App from './App.vue'
import router from './router'
import VueCountdown from '@chenfengyuan/vue-countdown';
import Markdown from 'vue3-markdown-it';
import { installAudioUnlock } from './utils/sound'

import './assets/scss/custom.scss'
import './assets/main.css'

// import './registerServiceWorker'

const pinia = createPinia()
pinia.use(piniaPersist)

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(Markdown);
app.component(VueCountdown.name, VueCountdown);

installAudioUnlock()

app.mount('#app')
