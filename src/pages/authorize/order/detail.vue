<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import DetailAction from './components/detail-action/index.vue'

import { getOrderDetail } from '@/services/api/order'

const order = ref()

const route = useRoute()

onMounted(async () => {
  const res = await getOrderDetail(route.params.id as string)
  order.value = res.result
})
</script>

<template>
  <div class="order-detail-page" v-if="order">
    <!-- 操作栏 -->
    <DetailAction :order="order" />
    <!-- 步骤条 -->
    <!-- 物流栏 -->
    <!-- 订单商品信息 -->
  </div>
</template>

<style scoped lang="less">
.order-detail-page {
  background: #fff;
  height: 100%;
}
</style>
