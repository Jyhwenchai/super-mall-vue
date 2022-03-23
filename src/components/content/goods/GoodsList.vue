<script setup>

import GoodsListItem from './GoodsListItem'

defineProps({
  goods: {
    type: Array,
    default () {
      return []
    }
  }
})

</script>

<template>
  <div class="goods-list">
    <GoodsListItem v-for="(item, index) in goods" :key="index" :goods-item="item"/>
  </div>
</template>

<style scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2px;
}
</style>
