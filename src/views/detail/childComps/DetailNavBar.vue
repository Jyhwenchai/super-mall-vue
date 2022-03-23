<script setup>
import NavBar from 'components/common/navbar/NavBar'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const emit = defineEmits(['titleClick'])
const titles = ref(['商品', '参数', '评论', '推荐'])
const currentIndex = ref(0)
const router = useRouter()

function titleClick (index) {
  currentIndex.value = index
  emit('titleClick', index)
}

function backClick () {
  router.back()
}

</script>

<template>
  <NavBar class="nav-bar">
    <template #left>
      <div class="back" @click="backClick">
        <img src="~assets/img/common/back.svg">
      </div>
    </template>
    <template #center>
      <div class="title">
        <div v-for="(item, index) in titles" :key="index" class="title-item" :class="{active: currentIndex === index }" @click="titleClick(index)">
          {{ item }}
        </div>
      </div>
    </template>
  </NavBar>
</template>

<style scoped>
.nav-bar {
  font-size: 13px;
}

.nav-bar .title {
  display: flex;
}

.nav-bar .center .title-item {
  flex: 1;
}

.back img {
  padding-left: 10px;
  margin-top: 13px;
}

.active {
  color: var(--color-high-text);
}
</style>
