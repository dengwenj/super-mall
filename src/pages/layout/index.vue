<script setup lang="ts">
import { useStore } from '@/store'

import Navbar from '@/components/NavBar/index.vue'
import Header from '@/components/Header/index.vue'
import Footer from '@/components/Footer/index.vue'

const store = useStore()
// 获取全部分类
store.dispatch('category/getList')
</script>

<template>
  <div class="container">
    <!-- 顶部通栏 -->
    <Navbar />

    <!-- 头部 -->
    <Header />

    <main>
      <!-- 二级路由 -->
      <router-view />
    </main>

    <!-- 底部 -->
    <Footer />
  </div>
</template>
