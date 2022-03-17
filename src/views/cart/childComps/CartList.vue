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
  components: {
    Scroll,
    CartListItem
  },
  props: {
    products: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style scoped>
.cart-list {
  height: 100%;
}

.cart-list .scroll-wrapper {
  height: 100%;
  overflow: hidden;
}
</style>
