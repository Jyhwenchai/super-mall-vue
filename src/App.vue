<template>
  <div id="container">
    <router-view v-slot="{ Component }">
      <keep-alive include="Home,Cart" exclude="Detail">
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
    <main-tab-bar class="main-tab-bar"></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar'
export default {
  name: 'App',
  components: {
    MainTabBar
  },
  mounted () {
    // 修复在safari、微信等浏览器上高度不正确的问题
    const dom = document.getElementById('container')
    dom.style.height = `${window.innerHeight}px`
  }
}
</script>
<style>
@import "assets/css/base.css";
.main-tab-bar {
  background-color: #fff;
}
</style>
