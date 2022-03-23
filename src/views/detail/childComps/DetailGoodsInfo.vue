<script setup>

import { ref, computed, watch } from 'vue'

const props = defineProps({
  detailInfo: {
    type: Object,
    default () {
      return {}
    }
  }
})

const emit = defineEmits(['imageLoad'])

const counter = ref(0)
const imagesLength = ref(0)

const infoKey = computed(() => props.detailInfo.detailImage[0].key)
const infoList = computed(() => props.detailInfo.detailImage[0].list)

watch(() => props.detailInfo, (detailInfo, old) => {
  imagesLength.value = detailInfo.detailImage[0].list.length
})

function imgLoad () {
  // 判断, 所有的图片都加载完了, 那么进行一次回调就可以了.
  if (++counter.value === imagesLength.value) {
    console.log('emit action')
    emit('imageLoad')
  }
}

</script>

<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start">
      </div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{infoKey}}</div>
    <div class="info-list">
      <img v-for="(item, index) in infoList" :key="index" :src="item" @load="imgLoad" >
    </div>
  </div>
</template>

<style scoped>
  .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc {
    padding: 0 15px;
  }

  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }

  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }

  .info-desc .end::after {
    right: 0;
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .info-list img {
    width: 100%;
  }
</style>
