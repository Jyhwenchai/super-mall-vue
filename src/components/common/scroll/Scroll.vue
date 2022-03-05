<template>
<div class="wrapper" ref="wrapper">
  <div class="content">
    <slot></slot>
  </div>
</div>
</template>

<script>
import BScroll from '@better-scroll/core'
import PullUp from '@better-scroll/pull-up'

export default {
  name: 'Scroll',
  emits: ['scroll', 'pullingUp'],
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    isPullUp: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isActive: false,
      scroll: null
    }
  },
  mounted () {
    BScroll.use(PullUp)
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.isPullUp
    })

    this.scroll.on('scroll', (position) => {
      this.$emit('scroll', position)
    })

    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })
  },
  methods: {
    scrollTo (x, y, time = 300) {
      this.scroll.scrollTo(x, y, time)
    },
    refresh () {
      console.log('refresh')
      this.scroll.refresh()
    },
    finishPullUp () {
      this.scroll.finishPullUp()
      this.refresh()
    }
  }
}

</script>

<style scoped>
</style>
