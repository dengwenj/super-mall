import { createRouter, createWebHistory } from 'vue-router'

import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/pages/layout/index.vue')
const Home = () => import('@/pages/home/index.vue')
const TopCategory = () => import('@/pages/category/index.vue')
const SubCategory = () => import('@/pages/category/sub.vue')

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

router.beforeEach((to, from) => {
  if (from.fullPath.includes('/category') && !from.fullPath.includes('/category/sub')) {
    localStorage.setItem('categoryId', from.params.id as string)
  }
})

export default router
