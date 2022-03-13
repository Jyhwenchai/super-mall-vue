<template>
  <swiper>
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" @load="imageLoad"/>
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'

export default {
  name: 'HomeSwiper',
  emits: ['imageLoad'],
  props: {
    banners: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      isImageLoad: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoad () {
      if (!this.isImageLoad) {
        this.isImageLoad = true
        this.$emit('imageLoad')
      }
    }
  }
}
</script>

<style scoped>
img {
  width: 100%;
}
</style>
