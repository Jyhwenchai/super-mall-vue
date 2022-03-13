<template>
  <nav-bar class="nav-bar">
    <template v-slot:center>
      <span>购物车({{cartLength}})</span>
    </template>
  </nav-bar>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar'

export default {
  name: 'CartNavBar',
  props: {
    cartLength: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  components: {
    NavBar
  }
}
</script>

<style scoped>
.nav-bar {
  color: #fff;
  background-color: var(--color-high-text);
  height: 44px;
}
</style>
