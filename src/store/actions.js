export default {
  addCart (payload) {
    return new Promise((resolve, reject) => {
      var product = this.cartList.find(item => item.iid === payload.iid)
      // 产品已经存在
      if (product) {
        product.count += 1
        resolve('当前商品数量+1')
      } else {
        payload.count = 1
        payload.checked = true
        this.cartList.push(payload)
        resolve('添加了新商品')
      }
    })
  },
  toogleCheckedCartProduct (payload) {
    payload.checked = !payload.checked
  }
}
