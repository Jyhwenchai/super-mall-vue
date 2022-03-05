<template>
<div class="tab-control">
  <div class="tab-control-item" v-for="(title, index) in titles" :key="index" @click="itemClick(index)" :class="{ active: index === currentIndex }">
    <span>{{ title }}</span>
  </div>
</div>
</template>

<script>
export default {
  name: 'TabControl',
  emits: ['itemClick'],
  props: {
    titles: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick (index) {
      this.currentIndex = index
      this.$emit('itemClick', index)
    }
  }
}
</script>

<style scoped>
.tab-control {
  display: flex;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  background-color: #fff;
  text-align: center;
}

.tab-control-item {
  flex: 1;
}

.tab-control-item span {
  padding: 5px;
}

.active {
  color: var(--color-high-text);
}

.active span {
  border-bottom: 3px solid var(--color-tint);
}
</style>
