import { createRouter, createWebHashHistory } from 'vue-router'

import store from '@/store'

import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/pages/layout/index.vue')
const Home = () => import('@/pages/home/index.vue')
const TopCategory = () => import('@/pages/category/index.vue')
const SubCategory = () => import('@/pages/category/sub.vue')
const Product = () => import('@/pages/goods/index.vue')
const Login = () => import('@/pages/login/index.vue')
const CallBack = () => import('@/pages/login/callback.vue')
const Cart = () => import('@/pages/cart/index.vue')
const Checkout = () => import('@/pages/authorize/checkout/index.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: Home
      },
      {
        path: '/category/:id',
        component: TopCategory
      },
      {
        path: '/category/sub/:id',
        component: SubCategory
      },
      {
        path: '/product/:id',
        component: Product
      },
      {
        path: '/cart',
        component: Cart
      },
      {
        path: '/authorize/checkout',
        component: Checkout
      }
    ]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/login/callback',
    component: CallBack
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  }
})

router.beforeEach((to, from) => {
  if (to.path.startsWith('/authorize') && !store.state.user.profile?.token) {
    return `/login?redirectUrl=${encodeURIComponent(to.fullPath)}`
  }
})

export default router
