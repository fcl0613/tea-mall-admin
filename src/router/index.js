import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'
import home from '@/views/home'
import { getToken } from '@/utils/token'
import dashboard from '@/views/dashboard'
import category from '@/views/category'


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