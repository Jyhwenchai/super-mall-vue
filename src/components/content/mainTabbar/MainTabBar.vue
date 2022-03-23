<script setup>
import TabBar from 'components/common/tabbar/TabBar.vue'
import TabBarItem from 'components/common/tabbar/TabBarItem.vue'
</script>

<template>
<TabBar>
  <TabBarItem path="/home" active-color="red">
   <template #item-icon>
      <img src="~assets/img/tabbar/home.svg" alt="">
    </template>
    <template #item-icon-active>
      <img src="~assets/img/tabbar/home_active.svg" alt="">
    </template>
    <template #item-text>
      <div>首页</div>
    </template>
  </TabBarItem>
  <TabBarItem path="/category">
    <template #item-icon>
      <img src="~assets/img/tabbar/category.svg" alt="">
    </template>
    <template #item-icon-active>
      <img src="~assets/img/tabbar/category_active.svg" alt="">
    </template>
    <template #item-text>
      <div>分类</div>
    </template>
  </TabBarItem>

  <TabBarItem path="/cart">
    <template #item-icon>
      <img src="~assets/img/tabbar/shopcart.svg" alt="">
    </template>
    <template #item-icon-active>
      <img src="~assets/img/tabbar/shopcart_active.svg" alt="">
    </template>
    <template #item-text>
      <div>购物车</div>
    </template>
  </TabBarItem>

  <TabBarItem path="/profile">
    <template #item-icon>
      <img src="~assets/img/tabbar/profile.svg" alt="">
    </template>
    <template #item-icon-active>
      <img src="~assets/img/tabbar/profile_active.svg" alt="">
    </template>
    <template #item-text>
      <div>我的</div>
    </template>
  </TabBarItem>
</TabBar>
</template>

<style scoped>
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
</style>
