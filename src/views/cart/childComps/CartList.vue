<template>
  <div class="cart-list">
    <scroll class="scroll-wrapper">
      <cart-list-item v-for="(item, index) in products" :key="index" :product="item"/>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'

export default {
  name: 'CartList',
  props: {
    products: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    Scroll,
    CartListItem
  }
}
</script>

<style scoped>
.cart-list {
  height: calc(100vh - 40px - 44px - 49px);
}

.cart-list .scroll-wrapper {
  height: 100%;
  overflow: hidden;
}
</style>
