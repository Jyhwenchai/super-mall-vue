<script setup>
import CheckButton from 'components/content/checkButton/CheckButton'
import { globalStore } from '@/store/global'

const props = defineProps({
  product: {
    type: Object,
    default () {
      return {}
    }
  }
})

const store = globalStore()

function checkClick () {
  store.toogleCheckedCartProduct(props.product)
}

</script>

<template>
<div class="cart-list-item">
  <div class="check-item">
    <CheckButton :is-checked="product.checked" class="check-button" @click="checkClick"/>
  </div>
  <div class="cart-list-left">
    <img :src="product.image" alt="" class="goods-img">
  </div>
  <div class="cart-list-right">
    <div class="goods-name">{{product.title}}</div>
    <div class="goods-info">
      <span class="price">￥{{product.price}}</span>
      <span class="count">x{{product.count}}</span>
    </div>
  </div>
</div>
</template>

<style scoped="scoped">
.cart-list-item {
  display: flex;
  border-bottom: 1px solid #ececec;
  padding: 10px 5px;
}

.cart-list-item .check-item {
  display: flex;
  align-items: center;
}

.cart-list-item .check-item .check-button {
  width: 20px;
  height: 20px;
}

.goods-img {
  width: 75px;
  height: 100px;
  overflow: hidden;
  border: 1px solid #ececec;
  border-radius: 6px;
  vertical-align: middle;
}

.cart-list-right {
  position: relative;
  flex: 1;
  padding: 0 10px;
}

.cart-list-right .goods-name {
  font-size: 15px;
}

.goods-info {
  display: flex;
  width: 100%;
  align-content: center;
  justify-content: space-around;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0 10px;
}

.goods-info .price {
  color: var(--color-tint);
  margin: 0;
}
</style>
