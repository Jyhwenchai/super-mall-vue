import { AddCartCounter, AddCart, ToogleCheckedCartProduct } from './mutation-type'

export default {
  addCart ({ state, commit }, payload) {
    return new Promise((resolve, reject) => {
      var product = state.cartList.find(item => item.iid === payload.iid)
      // 产品已经存在
      if (product) {
        commit(AddCartCounter, product)
        resolve('当前商品数量+1')
      } else {
        commit(AddCart, payload)
        resolve('添加了新商品')
      }
    })
  },

  toogleCheckedCartProduct ({ state, commit }, payload) {
    commit(ToogleCheckedCartProduct, payload)
  }
}
