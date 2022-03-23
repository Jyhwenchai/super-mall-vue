<script setup>
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'

const props = defineProps({
  path: {
    type: String,
    default: ''
  },
  activeColor: {
    type: String,
    default: 'red'
  }
})

const router = useRouter()
const route = useRoute()

const isActive = computed(() => route.path.indexOf(props.path) !== -1)
const activeStyle = computed(() => isActive.value ? { color: props.activeColor } : {})

function itemClick () {
  router.replace(props.path)
}

</script>

<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="isActive">
      <slot name="item-icon-active"></slot>
    </div>
    <div v-else>
      <slot name="item-icon"></slot>
    </div>
     <div :style="activeStyle">
       <slot name="item-text"></slot>
     </div>
  </div>
</template>

<style scoped>
.active {
  color: red;
}
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
</style>
