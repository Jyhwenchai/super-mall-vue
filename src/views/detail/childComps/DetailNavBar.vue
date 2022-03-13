<template>
  <nav-bar class="nav-bar">
    <template v-slot:left>
      <div @click="backClick" class="back">
        <img src="~assets/img/common/back.svg">
      </div>
    </template>
    <template v-slot:center>
      <div class="title">
        <div class="title-item" v-for="(item, index) in titles" :key="index" :class="{active: currentIndex === index }" @click="titleClick(index)">
          {{ item }}
        </div>
      </div>
    </template>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: 'DetailNavBar',
  components: { NavBar },
  data () {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    titleClick (index) {
      this.currentIndex = index
      this.$emit('titleClick', index)
    },
    backClick () {
      this.$router.back()
    }
  }
}

</script>

<style scoped>
.nav-bar {
  font-size: 13px;
}

.nav-bar .title {
  display: flex;
}

.nav-bar .center .title-item {
  flex: 1;
}

.back img {
  padding-left: 10px;
  margin-top: 13px;
}

.active {
  color: var(--color-high-text);
}
</style>
