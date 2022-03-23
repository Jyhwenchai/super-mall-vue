<script setup>
import { globalStore } from '@/store/global'

import CartNavBar from './childComps/CartNavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

const store = globalStore()

</script>

<template>
<div id="cart">
  <CartNavBar :cart-length="store.getCartLength" class="cart-nav-bar"/>
  <CartList :products="store.cartList" class="cart-list"/>
  <CartBottomBar class="cart-bottom=-bar"/>
</div>
</template>

<style scoped>
#cart {
  height: calc(100% - 49px);
}

.cart-list {
  height: calc(100% - 44px - 40px)
}
</style>
