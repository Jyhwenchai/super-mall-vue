<template>
<div class="wrapper" ref="wrapper">
  <div class="content">
    <slot></slot>
  </div>
</div>
</template>

<script>
import BScroll from '@better-scroll/core'

export default {
  name: 'Scroll',
  data () {
    return {
      scroll: null
    }
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: 3
    })

    this.scroll.on('scroll', (position) => {
      console.log(position)
    })
    this.scroll.on('enable', () => {
      console.log('start')
    })
  },
  methods: {
    scrollTo (x, y, time = 300) {
      console.log(this.scroll.y)
      this.scroll.scrollTo(x, y, time)
    }
  }
}

</script>

<style scoped>
</style>
