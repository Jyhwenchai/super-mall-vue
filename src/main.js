import { createApp } from 'vue'
import mitt from 'mitt'
import toast from 'components/common/toast'

import App from './App.vue'
import router from './router'
import store from './store'

const emitter = mitt()
const app = createApp(App)
app.use(store).use(router)
app.mount('#app')
app.config.globalProperties.emitter = emitter
app.config.globalProperties.$toast = toast
