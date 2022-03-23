<script setup>
import CheckButton from 'components/content/checkButton/CheckButton'
import { globalStore } from '@/store/global'
import { computed } from 'vue'

const store = globalStore()

const totalPrice = computed(() => {
  return '￥' + store.cartList.filter(item => {
    return item.checked
  }).reduce((initValue, product) => {
    return initValue + product.price * product.count
  }, 0).toFixed(2)
})

const checkLength = computed(() => store.cartList.filter(item => item.checked).length)
const isSelectAll = computed(() => {
  if (store.cartList.length === 0) {
    return false
  }
  return !store.cartList.find(item => !item.checked)
})

function selectAll () {
  const currentIsSelectAll = isSelectAll.value
  store.cartList.forEach(item => { item.checked = !currentIsSelectAll })
}

</script>

<template>
  <div class="cart-bottom-bar">
    <div class="check-content">
      <CheckButton :is-checked="isSelectAll" class="check-button" @click="selectAll"/>
      <span>全选</span>
    </div>
    <div class="price">合计：{{totalPrice}}</div>
    <div class="calculate">
      去计算：({{checkLength}})
    </div>
  </div>
</template>

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
