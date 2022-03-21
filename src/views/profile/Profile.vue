<template>
  <h2>我的</h2>
  <h1>{{ $translate('greetings.hello') }}</h1>
</template>

<script>
export default {
  name: 'Profile',
  inject: ['i18n'],
  created () {
    // console.log(this.i18n.greetings.hello) 
    // console.log(this.i18n.greetings.hello, 'dddd', this.$translate(greetings.hello)) 
  }
}
</script>

<style scoped>

</style>
