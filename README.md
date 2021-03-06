# super-mall-vue 

**项目结构**

* branch: v1-vue3-vuex

  使用 vue-cli5.0+、 vue3、vue-router4.0+、vuex4.0+、better-scroll2.0+

* branch: vite-pinia

  将 vue-cli 替换为 vite、vuex 替换为 pinia

* branch: v3-composition-api

  使用 Composition API 风格替换 Options API

## Project setup

**仅实现视频中的部分功能**

**运行项目前需配置 request.js 中的 baseURL(不知道请找相关人士索要)**

```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Fix Issues

#### 问题1：通过 height: 100vh; 获取的高度在 safari 浏览器中表现不正确

修复: 通过 window.innerHeight 获取真实高度并赋值给最外层 class="container" 容器

#### 问题2：默认 vue 生命周期在第一次创建时不会调用 activated 方法，但如果 将 vue 组建加入 KeepAlive 会导致创建时也会触发 activated 方法最终可能导致一些问题。

修复: 通过在一个加入到 KeepAlive 中的组件中设置 flag 标记以忽略第一次的触发调用

#### 问题3：better-scroll 无法滚动

修复: 这是由于问题1导致的，所以当问题1解决后这个问题也得到解决