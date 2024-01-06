import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store/index.js'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: '网易云音乐' }
  },
  {
    path: '/listview',
    name: 'listview',
    meta: { title: '歌单' },
    component: () => import('../views/ListView.vue')
  },
  {
    path: '/searchview',
    name: 'searchview',
    meta: { title: '搜索' },
    component: () => import('../views/Search.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: { title: '手机登录' }
  },
  {
    path: '/me',
    name: 'me',
    meta: { title: '个人主页' },
    beforeEnter: (to, from, next) => {
      if (!store.state.user.isLogin) next('/login');
      else next();
    },
    component: () => import('../views/Me.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
