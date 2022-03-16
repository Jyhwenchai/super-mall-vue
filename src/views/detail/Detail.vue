<template>
<detail-nav-bar class="detail-navbar" @titleClick="titleClick" ref="nav"/>
<div id="detail">
  <scroll class="scroll-wrapper" ref="scroll" :probeType="3" @scroll="contentScroll">
    <detail-swiper :topImages="topImages"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
    <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
    <detail-param-info :paramInfo="paramInfo" ref="paramInfo"/>
    <detail-comment-info :commentInfo="commentInfo" ref="commentInfo"/>
    <goods-list :goods="recommends" ref="recommends"/>
  </scroll>
</div>
<detail-bottom-bar @addCart="addCart"/>
</template>

<script>
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
import { itemListenerMixin } from 'common/mixin'
import { debounce } from 'common/utils'

export default {
  name: 'Detail',
  mixins: [itemListenerMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    Scroll
  },
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: [],
      recommends: [],
      themeTopY: [],
      getThemeTopY: null,
      currentIndex: 0
    }
  },
  created () {
    this.iid = this.$route.params.iid
    getDetail(this.iid)
      .then(res => {
        const result = res.data.result
        // 1. 轮播数据
        this.topImages = result.itemInfo.topImages.map(item => 'http:' + item)
        // 2. 获取商品信息
        this.goods = new Goods(result.itemInfo, result.columns, result.shopInfo.services)
        // 3. 购物信息
        this.shop = new Shop(result.shopInfo)
        // 4. 商品详情信息
        this.detailInfo = result.detailInfo
        // 5. 参数信息
        this.paramInfo = new GoodsParam(result.itemParams.info, result.itemParams.rule)
        // 6. 评论信息
        if (result.rate.cRate !== 0) {
          this.commentInfo = result.rate.list
        }
      })
    getRecommends()
      .then(res => {
        this.recommends = res.data.data.list
      })

    this.getThemeTopY = debounce(() => {
      this.themeTopY = []
      this.themeTopY.push(0)
      this.themeTopY.push(this.$refs.paramInfo.$el.offsetTop)
      this.themeTopY.push(this.$refs.commentInfo.$el.offsetTop)
      this.themeTopY.push(this.$refs.recommends.$el.offsetTop)
      this.themeTopY.push(Number.MAX_VALUE)
    }, 100)
  },
  methods: {
    imageLoad () {
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    titleClick (index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 300)
    },
    contentScroll (position) {
      const positionY = -position.y
      const length = this.themeTopY.length
      for (let i = 0; i < length; i++) {
        if (this.currentIndex !== i) {
          if (i < length - 1 && positionY >= this.themeTopY[i] && positionY < this.themeTopY[i + 1]) {
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
      }
    },
    addCart () {
      // 1. 获取商品要展示的信息
      var product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      // 2. 将商品添加到购物车
      // 可以使用 vuex 中 mapAction 简化
      this.$store.dispatch('addCart', product)
        .then(res => {
          this.$toast.show(res, 2000)
        })
    }
  },
  unmounted () {
    this.emitter.off('imageLoad', this.itemImgListener)
  }
}
</script>

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
