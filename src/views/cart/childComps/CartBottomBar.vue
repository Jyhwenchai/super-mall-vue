<template>
  <div class="cart-bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll" class="check-button" @click="selectAll"/>
      <span>全选</span>
    </div>
    <div class="price">合计：{{totalPrice}}</div>
    <div class="calculate">
      去计算：({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import { mapGetters } from 'vuex'

export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice () {
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((initValue, product) => {
        return initValue + product.price * product.count
      }, 0).toFixed(2)
    },
    checkLength () {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll () {
      if (this.cartList.length === 0) {
        return false
      }
      return !this.cartList.find(item => !item.checked)
    }
  },
  methods: {
    selectAll () {
      const currentIsSelectAll = this.isSelectAll
      this.cartList.forEach(item => { item.checked = !currentIsSelectAll })
    }
  }
}
</script>

<style>
.cart-bottom-bar {
  position: fixed;
  bottom: 49px;
  width: 100%;
  display: flex;
  height: 40px;
  line-height: 40px;
  background-color: #eee;
}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}

.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;

}

.price {
  margin-left: 30px;
  flex: 1;
}

.calculate {
  width: 100px;
  background-color: red;
  text-align: center;
  color: #fff;
}
</style>
