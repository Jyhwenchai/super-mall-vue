<template>
<div class="cart">
  <cart-nav-bar :cart-length="getCartLength"/>
  <cart-list :products="cartList"/>
  <cart-bottom-bar />
</div>
</template>

<script>
import CartNavBar from './childComps/CartNavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import { globalStore } from '@/store/global'
import { mapState } from 'pinia'

export default {
  name: 'Cart',
  components: {
    CartNavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    ...mapState(globalStore, ['getCartLength', 'cartList'])
  }
}
</script>

<style scoped>
.cart {
  height: calc(100% - 93px - 40px);
}
</style>
