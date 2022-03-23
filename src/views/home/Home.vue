<script setup>

import { ref, reactive, computed, onMounted, onActivated, onDeactivated } from 'vue'

import { debounce } from 'common/utils'
import { useBus } from 'common/emitter'

import { getHomeMultiData, getHomeGoods } from 'network/home'

import HomeNavBar from './chidComps/HomeNavBar'
import Scroll from 'components/common/scroll/Scroll'

import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'

import HomeSwiper from './chidComps/HomeSwiper'
import RecommendView from './chidComps/RecommendView'
import FeatureView from './chidComps/FeatureView'


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
const { bus } = useBus()

// refs
const scroll = ref(null)
const tabControl = ref(null)
const tabControlFixed = ref(null)
const itemImgListener = ref(null)
    
// State
const showGoods = computed(() => {
  return goods[currentType.value].list
}) 

// Lifecycle
onMounted(() => {
  tabOffsetTop.value = tabControl.value.$el.offsetTop 
  const refresh = debounce(scroll.value.refresh, 100)
  itemImgListener.value = function () {
    refresh()
  }
  itemImgListener.value()
})

onActivated(() => {
  bus.on('imageLoad', itemImgListener.value)
  scroll.value.refresh()
  scroll.value.scrollTo(0, saveY.value, 0)
})

onDeactivated(() => {
  bus.off('imageLoad', itemImgListener)
  saveY.value = scroll.value.getScrollY()
})

requestGetHomeMultiData()
requestGetHomeGoods('pop')
requestGetHomeGoods('new')
requestGetHomeGoods('sell')

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
  getHomeGoods(type, page)
    .then(res => {
      goods[type].list.push(...res.data.data.list)
      scroll.value && scroll.value.finishPullUp()
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

</script>

<template>
<div id="home">
  <HomeNavBar class="nav-bar"/>
  <TabControl v-show="isShowTabControl" ref="tabControlFixed" class="tab-control fixed" :titles="['流行', '新款', '精选']" @item-click="itemClick" />
  <Scroll ref="scroll" :probe-type="3" :is-pull-up="true" class="content" @scroll="contentScroll" @pulling-up="loadMore" >
    <HomeSwiper class="home-swiper" :banners="banners" @image-load="imageLoad" />
    <RecommendView :recommends="recommends" />
    <FeatureView />
    <TabControl ref="tabControl" class="tab-control" :titles="['流行', '新款', '精选']" @item-click="itemClick" />
    <GoodsList :goods="showGoods" />
  </Scroll>
  <BackTop v-show="isShowBackTop" class="back-top" @click="backTopClick" />
</div>
</template>

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
