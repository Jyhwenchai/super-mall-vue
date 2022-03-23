<script setup>

import NavBar from 'components/common/navbar/NavBar'

defineProps({
  cartLength: {
    type: Number,
    default () {
      return 0
    }
  }
})

</script>

<template>
  <NavBar class="nav-bar">
    <template #center>
      <span>购物车({{cartLength}})</span>
    </template>
  </NavBar>
</template>

<style scoped>
.nav-bar {
  color: #fff;
  background-color: var(--color-high-text);
  height: 44px;
}
</style>
