import Toast from './Toast'
import { createApp } from 'vue'

const initToast = () => {
  const app = createApp(Toast)
  const el = document.createElement('div')
  const toast = app.mount(el)
  document.body.appendChild(el)
  return toast
}

const toast = initToast()
export default toast
