<script setup lang="ts">
import { ref } from 'vue'
import { ElAffix } from 'element-plus'

import { useStore } from '@/store'

import Navbar from '@/components/NavBar/index.vue'
import Header from '@/components/Header/index.vue'
import Footer from '@/components/Footer/index.vue'
import HeaderSticky from '@/components/HeaderSticky/index.vue'

/**
 * 状态
 */
const isFixed = ref(false)
const store = useStore()
// 获取全部分类
store.dispatch('category/getList')

/**
 * 处理函数
 */
const handleScroll = ({ fixed }: {
  scrollTop: number;
  fixed: boolean;
}) => {
  isFixed.value = fixed
}
</script>

<template>
  <!-- 顶部通栏 -->
  <Navbar />

  <!-- 头部 -->
  <ElAffix :offset="0" @scroll="handleScroll">
    <Header :isFixed="isFixed" />  
    <!-- <HeaderSticky  /> -->
  </ElAffix>
  

  <main class="main">
    <!-- 二级路由 -->
    <router-view />
  </main>

  <!-- 底部 -->
  <Footer />
</template>

<style lang="less" scoped>
.main {
  height: 400px;
}
</style>
