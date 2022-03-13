<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  data () {
    return {
      isShow: false,
      message: ''
    }
  },
  methods: {
    show (message, duration = 2000) {
      this.isShow = true
      this.message = message
      console.log(message)
      setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, duration)
    }
  }
}
</script>

<style>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  background-color: rgba(0, 0, 0, .75);
  z-index: 999;
  border-radius: 3px;
  padding: 8px 10px;
}

</style>
