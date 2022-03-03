import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../views/home/Home')
const Card = () => import('../views/card/Card')
const Category = () => import('../views/category/Category')
const Profile = () => import('../views/profile/Profile')
// 创建路由对象
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/card',
    component: Card
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/profile',
    component: Profile
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
