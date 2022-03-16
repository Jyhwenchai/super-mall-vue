<template>
  <nav-bar>
    <template v-slot:left>
    </template>
    <template v-slot:center>
      <div>购物街</div>
    </template>
    <template v-slot:right>
    </template>
  </nav-bar>

</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name: 'HomeNavBar',
  components: {
      NavBar
  }
}
</script>

<style>
</style>