<template>
  <div class="check-button">
    <img src="~/assets/img/cart/tick.svg" alt="" :class="{ checked: isChecked }">
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    isChecked: {
      type: Boolean,
      default () {
        return false
      }
    }
  }
}
</script>
<style scoped>
.check-button {
  border-radius: 50%;
  border: 1px solid #aaa;
}
.checked {
  background-color: var(--color-tint);
}
</style>
