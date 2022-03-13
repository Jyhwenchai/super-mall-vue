import { AddCartCounter, AddCart, ToogleCheckedCartProduct } from './mutation-type'

export default {
  [AddCartCounter] (state, payload) {
    payload.count += 1
  },

  [AddCart] (state, payload) {
    payload.count = 1
    payload.checked = true
    state.cartList.push(payload)
  },

  [ToogleCheckedCartProduct] (state, payload) {
    payload.checked = !payload.checked
  }
}
