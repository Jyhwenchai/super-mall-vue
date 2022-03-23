<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { useBus } from 'common/emitter'
import toast from 'components/common/toast'

import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import GoodsList from 'components/content/goods/GoodsList'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'

import { getDetail, Goods, Shop, GoodsParam, getRecommends } from 'network/detail'
import { debounce } from 'common/utils'
import { globalStore } from '@/store/global'

const iid = ref(null)
const topImages = ref([])
const goods = ref({})
const shop = ref({})
const detailInfo = ref({})
const paramInfo = ref({})
const commentInfo = ref([])
const recommends = ref([])
const themeTopY = ref([])
const getThemeTopY = ref(null)
const currentIndex = ref(0)
const route = useRoute()

const itemImgListener = ref(null)

const store = globalStore()
const { bus } = useBus()

// refs
const nav = ref(null)
const paramInfoRef = ref(null)
const commentInfoRef = ref(null)
const recommendsRef = ref(null)
const scrollRef = ref(null)

// Lifecycle
onMounted(() => {
  const refresh = debounce(scrollRef.value.refresh, 100)
  itemImgListener.value = function () {
    refresh()
  }
  itemImgListener.value()
  bus.on('imageLoad', itemImgListener.value)
})

onUnmounted(() => {
  bus.off('imageLoad', itemImgListener.value)
})

init()

// Methods
function init() {
  iid.value = route.params.iid
  getDetail(iid.value)
    .then(res => {
      const result = res.data.result
      // 1. 轮播数据
      topImages.value = result.itemInfo.topImages.map(item => 'http:' + item)
      // 2. 获取商品信息
      goods.value = new Goods(result.itemInfo, result.columns, result.shopInfo.services)
      // 3. 购物信息
      shop.value = new Shop(result.shopInfo)
      // 4. 商品详情信息
      detailInfo.value = result.detailInfo
      // 5. 参数信息
      paramInfo.value = new GoodsParam(result.itemParams.info, result.itemParams.rule)
      // 6. 评论信息
      if (result.rate.cRate !== 0) {
        commentInfo.value = result.rate.list
      }
    })
  getRecommends()
    .then(res => {
      recommends.value = res.data.data.list
    })

  getThemeTopY.value = debounce(() => {
    themeTopY.value = []
    let array = []
    array.push(0)
    array.push(paramInfoRef.value.$el.offsetTop)
    array.push(commentInfoRef.value.$el.offsetTop)
    array.push(recommendsRef.value.$el.offsetTop)
    array.push(Number.MAX_VALUE)
    themeTopY.value = array
  }, 100)
}

function imageLoad () {
  scrollRef.value && scrollRef.value.refresh()
  getThemeTopY.value()
}

function titleClick (index) {
  scrollRef.value.scrollTo(0, -themeTopY.value[index], 300)
}

function contentScroll (position) {
  const positionY = -position.y
  const length = themeTopY.value.length
  for (let i = 0; i < length; i++) {
    if (currentIndex.value !== i) {
      if (i < length - 1 && positionY >= themeTopY.value[i] && positionY < themeTopY.value[i + 1]) {
        currentIndex.value = i
        nav.value.currentIndex = currentIndex.value
      }
    }
  }
}

function addCart () {
  // 1. 获取商品要展示的信息
  var product = {}
  product.image = topImages.value[0]
  product.title = goods.value.title
  product.desc = goods.value.desc
  product.price = goods.value.realPrice
  product.iid = iid.value
  // 2. 将商品添加到购物车
  store.addCart(product)
    .then(res => {
      toast.show(res, 2000)
    })
}
</script>
<template>
<DetailNavBar ref="nav" class="detail-navbar" @title-click="titleClick"/>
<div id="detail">
  <Scroll ref="scrollRef" :probe-type="3" class="scroll-wrapper"  @scroll="contentScroll">
    <DetailSwiper :top-images="topImages"/>
    <DetailBaseInfo :goods="goods"/>
    <DetailShopInfo :shop="shop"/>
    <DetailGoodsInfo :detail-info="detailInfo" @image-load="imageLoad"/>
    <DetailParamInfo ref="paramInfoRef" :param-info="paramInfo" />
    <DetailCommentInfo ref="commentInfoRef" :comment-info="commentInfo"/>
    <GoodsList ref="recommendsRef" :goods="recommends"/>
  </Scroll>
</div>
<DetailBottomBar @add-cart="addCart"/>
</template>

<style scoped>
#detail {
  position: relative;
  height: calc(100% - 93px);
  z-index: 10;
  background-color: #fff;
}
.detail-navbar {
  background-color: #fff;
  position: relative;
  width: 100%;
  z-index: 15;
}
.scroll-wrapper {
  position: relative;
  height: 100%;
  background-color: #fff;
  z-index: 10;
}
</style>
