<script setup>
import { ref } from 'vue'
import { Swiper, SwiperItem } from 'components/common/swiper'

const isImageLoad = ref(false)
const props = defineProps({
  banners: {
    type: Array,
    default () {
      return []
    }
  }
})

const emit = defineEmits(['imageLoad'])

function imageLoad () {
  if (!isImageLoad.value) {
    isImageLoad.value = true
    emit('imageLoad')
  }
}


</script>

<template>
  <swiper>
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" @load="imageLoad"/>
      </a>
    </swiper-item>
  </swiper>
</template>

<style scoped>
img {
  width: 100%;
}
</style>
