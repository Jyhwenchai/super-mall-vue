<script setup>

import BScroll from '@better-scroll/core'
import PullUp from '@better-scroll/pull-up'

import { ref, onMounted } from 'vue'

// State
const props = defineProps( {
  probeType: {
    type: Number,
    default: 0
  },
  isPullUp: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['scroll', 'pullingUp'])

// refs
const wrapper = ref(null)

// Methods
function scrollTo (x, y, time = 300) {
  scroll && scroll.scrollTo(x, y, time)
}

function refresh () {
  scroll && scroll.refresh()
}

function finishPullUp () {
  scroll && scroll.finishPullUp()
  refresh()
}

function getScrollY () {
  return scroll ? scroll.y : 0
}

let scroll = null
onMounted(() => {
  BScroll.use(PullUp)
  scroll = new BScroll(wrapper.value, {
    click: true,
    probeType: props.probeType,
    pullUpLoad: props.isPullUp
  })

  if (props.probeType === 2 || props.probeType === 3) {
    scroll.on('scroll', (position) => {
      emits('scroll', position)
    })
  }

  if (props.isPullUp) {
    scroll.on('pullingUp', () => {
      emits('pullingUp')
    })
  }
})

defineExpose({ scrollTo, refresh, finishPullUp, getScrollY })

</script>

<template>
<div ref="wrapper" class="wrapper">
  <div class="content">
    <slot></slot>
  </div>
</div>
</template>

<style scoped>
</style>
