<script setup>
import HomeNavBar from './chidComps/HomeNavBar'
import Scroll from 'components/common/scroll/Scroll'

import { debounce } from 'common/utils'

import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'

import HomeSwiper from './chidComps/HomeSwiper'
import RecommendView from './chidComps/RecommendView'
import FeatureView from './chidComps/FeatureView'

import { getHomeMultiData, getHomeGoods } from 'network/home'

import { ref, reactive, computed, onMounted, onActivated } from 'vue'

const banners = ref([])
const recommends = ref([])
const goods = reactive({
  pop: { page: 0, list: [] },
  new: { page: 0, list: [] },
  sell: { page: 0, list: [] }
})
const currentType = ref('pop')
const isShowBackTop = ref(false)
const tabOffsetTop = ref(0)
const isShowTabControl = ref(false)
const saveY = ref(0)
const isFirstActived = ref(false)

// refs
const scroll = ref(null)
const tabControl = ref(null)
const tabControlFixed = ref(null)

const itemImgListener = ref(null)

const showGoods = computed(() => {
  return goods[currentType.value].list
}) 

// 网络请求
function requestGetHomeMultiData () {
  getHomeMultiData()
    .then(res => {
      banners.value = res.data.data.banner.list
      recommends.value = res.data.data.recommend.list
    })
}

function requestGetHomeGoods (type) {
  const page = goods[type].page + 1
  if (page === 3) return 
  getHomeGoods(type, page)
    .then(res => {
      goods[type].list.push(...res.data.data.list)
      scroll && scroll.value.finishPullUp()
      goods[type].page += 1
    })
}

function itemClick (index) {
  switch (index) {
    case 0:
      currentType.value = 'pop'
      break
    case 1:
      currentType.value = 'new'
      break
    case 2:
      currentType.value = 'sell'
      break
  }
  tabControl.value.currentIndex = index
  tabControlFixed.value.currentIndex = index
}

function imageLoad () {
  console.log('imageLoad')
  tabOffsetTop.value = tabControl.value.$el.offsetTop
}

function backTopClick () {
  scroll.value.scrollTo(0, 0)
}
    
function contentScroll (position) {
  isShowBackTop.value = (-position.y) > 1000
  isShowTabControl.value = (-position.y) > tabOffsetTop.value
}

function loadMore () {
  requestGetHomeGoods(currentType.value)
}

requestGetHomeMultiData()
requestGetHomeGoods('pop')
requestGetHomeGoods('new')
requestGetHomeGoods('sell')
    
onMounted(() => {
    console.log('dfdfd')
  tabOffsetTop.value = tabControl.value.$el.offsetTop 
  const refresh = debounce(scroll.value.refresh, 100)
  itemImgListener.value = function () {
    refresh()
  }
  itemImgListener.value()
})

onActivated(() => {
  console.log('actived')
})

</script>

<template>
<div id="home">
  <HomeNavBar class="nav-bar"/>
  <TabControl v-show="isShowTabControl" ref="tabControlFixed" class="tab-control fixed" :titles="['流行', '新款', '精选']" @item-click="itemClick" />
  <Scroll ref="scroll" :probeType="3" :isPullUp="true" class="content" @scroll="contentScroll" @pulling-up="loadMore" >
    <HomeSwiper class="home-swiper" :banners="banners" @image-load="imageLoad" />
    <RecommendView :recommends="recommends" />
    <FeatureView />
    <TabControl ref="tabControl" class="tab-control" :titles="['流行', '新款', '精选']" @item-click="itemClick" />
    <GoodsList :goods="showGoods" />
  </Scroll>
  <BackTop v-show="isShowBackTop" class="back-top" @click="backTopClick" />
</div>
</template>

<script>
export default {
  // : [itemListenerMixin],
  // computed: {
  //   showGoods () {
  //     return this.goods[this.currentType].list
  //   }
  // },
  // created () {
    // this.getHomeMultiData()
    // this.getHomeGoods('pop')
    // this.getHomeGoods('new')
    // this.getHomeGoods('sell')
  // },
  // mounted () {
    // this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
  // },
  // activated () {
  //   // 注意: 由于 Home 加入 KeepAlive 导致第一次创建 Home 是会触发 activated 的调用，所以要进行一定的处理
  //   if (!this.isFirstActived) {
  //     this.isFirstActived = true
  //     return
  //   }
  //   this.emitter.on('imageLoad', this.itemImgListener)
  //   this.$refs.scroll.scrollTo(0, this.saveY, 0)
  //   this.$refs.scroll.refresh()
  // },
  // deactivated () {
  //   this.emitter.off('imageLoad', this.itemImgListener)
  //   this.saveY = this.$refs.scroll.getScrollY()
  // },
  // methods: {
  //   itemClick (index) {
  //     switch (index) {
  //       case 0:
  //         this.currentType = 'pop'
  //         break
  //       case 1:
  //         this.currentType = 'new'
  //         break
  //       case 2:
  //         this.currentType = 'sell'
  //         break
  //     }
  //     this.$refs.tabControl.currentIndex = index
  //     this.$refs.tabControlFixed.currentIndex = index
  //   },

  //   imageLoad () {
  //     this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
  //   },

  //   backTop () {
  //     this.$refs.scroll.scrollTo(0, 0)
  //   },

  //   contentScroll (position) {
  //     this.isShowBackTop = (-position.y) > 1000
  //     this.isShowTabControl = (-position.y) > this.tabOffsetTop
  //   },

  //   loadMore () {
  //     this.getHomeGoods(this.currentType)
  //   },

  // }
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
