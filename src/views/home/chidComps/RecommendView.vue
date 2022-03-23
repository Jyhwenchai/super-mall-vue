<script setup>

defineProps({
  recommends: {
    type: Array,
    default () {
      return []
    }
  }
})

</script>

<template>
  <div class="recommend">
    <div v-for="(item, index) in recommends" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image">
        <p>{{ item.title }}</p>
      </a>
    </div>
  </div>
</template>

<style scoped>
.recommend {
  display: flex;
  width: 100%;
  text-align: center;
  padding: 10px 0 20px;
  border-bottom: 8px solid #eee ;
}
.recommend .recommend-item {
  flex: 1;
  color: #666;
  font-size: 12px;
}

.recommend .recommend-item img {
  width: 100%;
  padding: 0 5px;
  margin-bottom: 10px;
}
</style>
