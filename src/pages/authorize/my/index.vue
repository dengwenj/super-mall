<script setup lang="ts">
import MyOverview from './components/my-overview/index.vue'
import MyPanel from './components/my-panel/index.vue'
import GoodsRelevant from '@/pages/goods/components/goods-relevant/index.vue'
</script>

<template>
  <div class="member-home">
    <!-- 概览 -->
    <MyOverview />
    <!-- 收藏 -->
    <MyPanel title="我的收藏"></MyPanel>
    <!-- 足迹 -->
    <MyPanel title="我的足迹"></MyPanel>
    <!-- 猜你 -->
    <GoodsRelevant />
  </div>
</template>

<style scoped lang="less">
:deep(.xtx-carousel) .carousel-btn.prev {
  left: 5px;
}
:deep(.xtx-carousel) .carousel-btn.next {
  right: 5px;
}
</style>

