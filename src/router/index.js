import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'
import home from '@/views/home'
import { getToken } from '@/utils/token'
import dashboard from '@/views/dashboard'
import category from '@/views/category'
import user from '@/views/user'
import apply from '@/views/store/apply'
import store from '@/views/store'
import banner from '@/views/banner'
import orderList from '@/views/order'
import orderDetail from '@/views/order/detail'


Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/home',
      component: home,
      redirect: '/dashboard',
      children: [
        {
          path: '/dashboard',
          component: dashboard
        },
        {
          path: '/categoryList',
          component: category
        },
        {
          path: '/userList',
          component: user
        },
        {
          path: '/storeApplyList',
          component: apply
        },
        {
          path: '/storeList',
          component: store
        },
        {
          path: '/bannerList',
          component: banner
        },
        {
          path: '/orderList',
          component: orderList
        },
        {
          path: '/orderDetail',
          component: orderDetail
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const token = getToken
  if (!token) {
    return next('/login')
  }
  next()
})

export default router