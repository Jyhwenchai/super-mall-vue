<script setup>
defineProps({
  isChecked: {
    type: Boolean,
    default () {
      return false
    }
  }
})

</script>
<template>
  <div class="check-button" :class="{ checked: isChecked }">
    <img src="~/assets/img/cart/tick.svg" alt="">
  </div>
</template>

<style scoped>
.check-button {
  border-radius: 50%;
  border: 1px solid #aaa;
  display: flex;
  justify-content: center;
  align-content: center;
}

.checked {
  background-color: var(--color-tint);
  border: 0;
}
</style>
