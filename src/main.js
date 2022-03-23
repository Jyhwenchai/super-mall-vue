import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import i18nPlugin from './views/profile/i18n'

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
