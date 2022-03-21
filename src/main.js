import { createApp } from 'vue'
import mitt from 'mitt'
import toast from 'components/common/toast'

import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import i18nPlugin from './views/profile/i18n'

const emitter = mitt()
const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(i18nPlugin, {
  greetings: {
    hello: 'Bonjour!'
  }
})
app.mount('#app')
app.config.globalProperties.emitter = emitter
app.config.globalProperties.$toast = toast
