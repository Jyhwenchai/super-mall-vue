# vue-first-project-practice

## Project setup
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

#### 问题1：通过 height: 100vh; 获取的高度在 safari 浏览器种表现不正确?

修复: 通过 window.innerHeight 获取真实高度并赋值给最外层 class="container" 容器
