<script setup>

import MainTabBar from 'components/content/mainTabbar/MainTabBar'

import { onMounted } from 'vue'

onMounted(() => {
  // 修复在safari、微信等浏览器上高度不正确的问题
  const dom = document.getElementById('container')
  dom.style.height = `${window.innerHeight}px`
})

</script>

<template>
  <div id="container">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" v-if="$route.meta.keepAlive" :key="$route.name" />
      </keep-alive>
      <component :is="Component" v-if="!$route.meta.keepAlive" />
    </router-view>
    <main-tab-bar class="main-tab-bar" />
  </div>
</template>

<style>
@import "assets/css/base.css";
.main-tab-bar {
  background-color: #fff;
}
</style>
