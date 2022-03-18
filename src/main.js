import { createApp } from 'vue'
import mitt from 'mitt'
import toast from 'components/common/toast'

import App from './App.vue'
import router from './router'
// import { globalStore } from '@/store/global'
import { createPinia } from 'pinia'

const emitter = mitt()
const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.mount('#app')
app.config.globalProperties.emitter = emitter
app.config.globalProperties.$toast = toast

// const store = globalStore()
// app.config.globalProperties.$store = store
