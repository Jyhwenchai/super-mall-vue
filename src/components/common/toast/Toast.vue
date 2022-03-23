<script setup>
import { ref } from 'vue'

const isShow = ref(false)
const message = ref('')

function show (msg, duration = 2000) {
  isShow.value = true
  message.value = msg 
  setTimeout(() => {
    isShow.value = false
    message.value = ''
  }, duration)
}

defineExpose({ show })

</script>

<template>
  <div v-show="isShow" class="toast">
    <div>{{message}}</div>
  </div>
</template>

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
