import { createRouter, createWebHistory } from 'vue-router'

import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/pages/layout/index.vue')
const Home = () => import('@/pages/home/index.vue')
const TopCategory = () => import('@/pages/category/index.vue')
const SubCategory = () => import('@/pages/category/sub.vue')
const Product = () => import('@/pages/goods/index.vue')

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
      }
    ]
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(),
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  }
})

export default router
