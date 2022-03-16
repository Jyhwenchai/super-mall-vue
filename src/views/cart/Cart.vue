<template>
<div class="cart">
  <cart-nav-bar :cartLength="getCartLength"/>
  <cart-list :products="cartList"/>
  <cart-bottom-bar />
</div>
</template>

<script>
import CartNavBar from './childComps/CartNavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
  components: {
    CartNavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    ...mapGetters([
      'getCartLength',
      'cartList'
    ])
  }
}
</script>

<style scoped>
.cart {
  height: calc(100% - 93px - 40px);
}
</style>
