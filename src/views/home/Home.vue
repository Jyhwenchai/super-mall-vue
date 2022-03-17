<template>
<div id="home">
  <home-nav-bar class="nav-bar"/>
  <tab-control v-show="isShowTabControl" ref="tabControlFixed" class="tab-control fixed" :titles="['流行', '新款', '精选']" @item-click="itemClick"></tab-control>
  <scroll ref="scroll" :probe-type="3" :is-pull-up="true" class="content" @scroll="contentScroll" @pulling-up="loadMore" >
    <home-swiper class="home-swiper" :banners="banners" @image-load="imageLoad"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control ref="tabControl" class="tab-control" :titles="['流行', '新款', '精选']" @item-click="itemClick"></tab-control>
    <goods-list :goods="showGoods"></goods-list>
  </scroll>
  <back-top v-show="isShowBackTop" class="back-top" @click="backTop" />
</div>
</template>

<script>
import HomeNavBar from './chidComps/HomeNavBar'
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
  components: {
    TabControl,
    HomeNavBar,
    GoodsList,
    HomeSwiper,
    RecommendView,
    FeatureView,
    Scroll,
    BackTop
  },
  mixins: [itemListenerMixin],
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
      saveY: 0,
      isFirstActived: false
    }
  },
  computed: {
    showGoods () {
      return this.goods[this.currentType].list
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
  activated () {
    // 注意: 由于 Home 加入 KeepAlive 导致第一次创建 Home 是会触发 activated 的调用，所以要进行一定的处理
    if (!this.isFirstActived) {
      this.isFirstActived = true
      return
    }
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
  height: 100%;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}

.home-swiper {
  height: 200px;
}

.tab-control.fixed {
  position: fixed;
  width: 100%;
}

.fixed {
  z-index: 1000;
}

.content {
  position: relative;
  height: calc(100% - 93px);
  overflow: hidden;
}
</style>
