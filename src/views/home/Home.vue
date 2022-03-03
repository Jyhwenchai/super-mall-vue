<template>
<div id="home">
  <nav-bar>
    <template v-slot:left>
    </template>
    <template v-slot:center>
      <div>购物街</div>
    </template>
    <template v-slot:right>
    </template>
  </nav-bar>
  <home-swiper :banners="banners"></home-swiper>
  <recommend-view :recommends="recommends"></recommend-view>
  <feature-view></feature-view>
  <tab-control class="tab-control" :titles="['流行', '新款', '精选']" @itemClick="itemClick"></tab-control>
  <goods-list :goods="showGoods"></goods-list>
</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import HomeSwiper from './chidCommps/HomeSwiper'
import RecommendView from './chidCommps/RecommendView'
import FeatureView from './chidCommps/FeatureView'

import { getHomeMultiData, getHomeGoods } from 'network/home'

export default {
  name: 'Home',
  components: {
    TabControl,
    NavBar,
    GoodsList,
    HomeSwiper,
    RecommendView,
    FeatureView
  },
  data () {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: 'pop'
    }
  },
  created () {
    this.getHomeMultiData()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  computed: {
    showGoods () {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    itemClick (index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },
    // 网络请求
    getHomeMultiData () {
      getHomeMultiData()
        .then(res => {
          this.banners = res.data.data.banner.list
          this.recommends = res.data.data.recommend.list
        })
    },
    getHomeGoods (type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page)
        .then(res => {
          this.goods[type].list.push(...res.data.data.list)
        })
    }
  }
}
</script>

<style scoped>
#home {
  padding-top: 44px;
}
.nav-bar {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--color-tint);
  color: #fff;
}

.tab-control {
  position: sticky;
  top: 44px;
  z-index: 10;
}
</style>
