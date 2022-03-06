<template>
  <router-view v-slot="{ Component }">
    <keep-alive include="Home">
      <component class="view" :is="Component"></component>
    </keep-alive>
  </router-view>
  <main-tab-bar class="main-tab-bar"></main-tab-bar>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar'
import Home from 'views/home/Home'
export default {
  name: 'App',
  components: {
    Home,
    MainTabBar
  }
}
</script>
<style>
@import "assets/css/base.css";
.main-tab-bar {
  background-color: #fff;
  z-index: 100;
}
</style>
