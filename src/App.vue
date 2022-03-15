<template>
  <router-view v-slot="{ Component }">
    <keep-alive include="Home,Cart" exclude="Detail">
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
  <main-tab-bar class="main-tab-bar"></main-tab-bar>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar'
export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>
<style>
@import "assets/css/base.css";
.main-tab-bar {
  background-color: #fff;
}
</style>
