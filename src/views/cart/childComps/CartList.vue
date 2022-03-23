<script setup>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'

defineProps({
  products: {
    type: Array,
    default () {
      return []
    }
  }
})

</script>

<template>
<Scroll class="scroll-wrapper">
  <CartListItem v-for="(item, index) in products" :key="index" :product="item"/>
</Scroll>
</template>

<style scoped>
.scroll-wrapper {
  overflow: hidden;
}
</style>
