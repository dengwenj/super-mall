<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { getCollect } from '@/services/api/my'

import MyOverview from './components/my-overview/index.vue'
import MyPanel from './components/my-panel/index.vue'
import GoodsRelevant from '@/pages/goods/components/goods-relevant/index.vue'
import GoodsItem from '@/pages/category/components/goods-item/index.vue'

const collectGoods = ref([])

onMounted(async () => {
  const res = await getCollect({
    page: 1,
    pageSize: 4
  })
  collectGoods.value = res.result.items
})

</script>

<template>
  <div class="member-home">
    <!-- 概览 -->
    <MyOverview />
    <!-- 收藏 -->
    <MyPanel title="我的收藏">
      <GoodsItem v-for="item in collectGoods" :key="item.id" :goods="item" />
    </MyPanel>
    <!-- 足迹 -->
    <MyPanel title="我的足迹">
      <GoodsItem v-for="item in collectGoods" :key="item.id" :goods="item" />
    </MyPanel>
    <!-- 猜你 -->
    <GoodsRelevant />
  </div>
</template>

<style scoped lang="less">

</style>

