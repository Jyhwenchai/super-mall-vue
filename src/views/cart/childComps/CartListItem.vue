<template>
<div class="cart-list-item">
  <check-button :isChecked="product.checked" class="check-item" @click="checkClick"/>
  <div class="cart-list-left">
    <img :src="product.image" alt="" class="goods-img">
  </div>
  <div class="cart-list-right">
    <div class="goods-name one-txt-cut">{{product.title}}</div>
    <div class="goods-info flex">
      <span class="price">￥{{product.price}}</span><span>x{{product.count}}</span>
    </div>
  </div>
</div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
export default {
  name: 'CartListItem',
  props: {
    product: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      productItem: null
    }
  },
  components: {
    CheckButton
  },
  methods: {
    checkClick () {
      this.$store.dispatch('toogleCheckedCartProduct', this.product)
    }
  },
  created () {
    this.productItem = this.product
  }
}
</script>

<style scoped="scoped">
.cart-list-item {
  display: flex;
  border-bottom: 1px solid #ececec;
}
.cart-list-item .check-item {
  width: 20px;
  height: 20px;
}

.cart-list-left {
  width: 26%;
  align-items: center;
}
.cart-list-left .check {
  width: 20px;
  height: 20px;
  overflow: hidden;
  border-radius: 100%;
  border: 1px solid #ececec;
}
.check:checked {
  background: url(~assets/img/detail/check_active.png) no-repeat center;
  background-size: cover;
}
.goods-img {
  width: 75px;
  height: 100px;
  overflow: hidden;
  border: 1px solid #ececec;
  margin:0 10px;
  border-radius: 6px;
  vertical-align: middle;
}
.cart-list-right {
  width: 74%;
  position: relative;
}
.cart-list-right .goods-name {
  width: 100%;
  font-size: 13px;
}
.goods-info {
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
.goods-info .price {
  color: #F9CD0B;
}
</style>
