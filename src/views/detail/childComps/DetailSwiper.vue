<script setup>
import { Swiper, SwiperItem } from 'components/common/swiper'

defineProps({
  topImages: {
    type: Array,
    default () {
      return []
    }
  }
})

</script>

<template>
  <Swiper class="swiper-container">
    <SwiperItem v-for="(item, index) in topImages" :key="index">
      <img :src="item" alt="">
    </SwiperItem>
  </Swiper>
</template>

<style scoped>
.swiper-container {
  height: 300px;
}
</style>
