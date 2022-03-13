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
  <tab-control class="tab-control fixed" v-show="isShowTabControl" ref="tabControlFixed" :titles="['流行', '新款', '精选']" @itemClick="itemClick"></tab-control>
  <scroll class="content" ref="scroll" @scroll="contentScroll" @pullingUp="loadMore" :probe-type="3" :is-pull-up="true">
    <home-swiper class="home-swiper" :banners="banners" @imageLoad="imageLoad"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control class="tab-control" ref="tabControl" :titles="['流行', '新款', '精选']" @itemClick="itemClick"></tab-control>
    <goods-list :goods="showGoods"></goods-list>
  </scroll>
  <back-top @click="backTop" class="back-top" v-show="isShowBackTop"/>
</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'

import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'

import HomeSwiper from './chidComps/HomeSwiper'
import RecommendView from './chidComps/RecommendView'
import FeatureView from './chidComps/FeatureView'

import { getHomeMultiData, getHomeGoods } from 'network/home'

import { itemListenerMixin } from 'common/mixin'

export default {
  name: 'Home',
  mixins: [itemListenerMixin],
  components: {
    TabControl,
    NavBar,
    GoodsList,
    HomeSwiper,
    RecommendView,
    FeatureView,
    Scroll,
    BackTop
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
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isShowTabControl: false,
      saveY: 0
    }
  },
  created () {
    this.getHomeMultiData()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted () {
    this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
  },
  computed: {
    showGoods () {
      return this.goods[this.currentType].list
    }
  },
  activated () {
    this.emitter.on('imageLoad', this.itemImgListener)
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated () {
    this.emitter.off('imageLoad', this.itemImgListener)
    this.saveY = this.$refs.scroll.getScrollY()
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
      this.$refs.tabControl.currentIndex = index
      this.$refs.tabControlFixed.currentIndex = index
    },

    imageLoad () {
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
    },

    backTop () {
      this.$refs.scroll.scrollTo(0, 0)
    },

    contentScroll (position) {
      this.isShowBackTop = (-position.y) > 1000
      this.isShowTabControl = (-position.y) > this.tabOffsetTop
    },

    loadMore () {
      this.getHomeGoods(this.currentType)
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
          this.$refs.scroll.finishPullUp()
          this.goods[type].page += 1
        })
    }
  }
}
</script>

<style scoped>
#home {
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}

.home-swiper {
  height: 200px;
}

.tab-control {
  position: relative;
  width: 100%;
}

.fixed {
  z-index: 1000;
}

.content {
  position: absolute;;
  height: calc(100% - 93px);
  top: 44px;
  padding-bottom: 49px;
  overflow: hidden;
}
</style>
