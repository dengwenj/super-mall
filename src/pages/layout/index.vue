<script setup lang="ts">
import { ref } from 'vue'
import { ElAffix, ElBacktop, ElIcon } from 'element-plus'
import { ArrowUpBold  } from '@element-plus/icons-vue'

import { useStore } from '@/store'

import Navbar from '@/components/NavBar/index.vue'
import Header from '@/components/Header/index.vue'
import Footer from '@/components/Footer/index.vue'

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
  </ElAffix>
  

  <main class="main">
    <!-- 二级路由 -->
    <router-view />
  </main>

  <!-- 底部 -->
  <Footer />

  <ElBacktop style="width: 50px; height: 50px;" :right="80" :bottom="250">
    <div class="top">
      <el-icon><ArrowUpBold /></el-icon>
    </div>
  </ElBacktop>
</template>

<style lang="less" scoped>
.main {
  height: 1400px;
}
.top {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--el-bg-color-overlay);
  box-shadow: var(--el-box-shadow-lighter);
}
.el-icon {
  color: @themeColor;
  font-size: 26px;
}
</style>
