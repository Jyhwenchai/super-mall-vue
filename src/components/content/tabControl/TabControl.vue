<script setup>
import { ref } from 'vue'

const emit = defineEmits(['itemClick'])
defineProps({
  titles: {
    type: Array,
    default () {
      return []
    }
  }
})

const currentIndex = ref(0)

function itemClick (index) {
  currentIndex.value = index
  emit('itemClick', index)
}

</script>

<template>
<div class="tab-control">
  <div v-for="(title, index) in titles" :key="index"  class="tab-control-item" :class="{ active: index === currentIndex }" @click="itemClick(index)" >
    <span>{{ title }}</span>
  </div>
</div>
</template>

<style scoped>
.tab-control {
  display: flex;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  background-color: #fff;
  text-align: center;
}

.tab-control-item {
  flex: 1;
}

.tab-control-item span {
  padding: 5px;
}

.active {
  color: var(--color-high-text);
}

.active span {
  border-bottom: 3px solid var(--color-tint);
}
</style>
