<script setup lang="ts">
import { defineProps, ref } from 'vue'

import WwButton from '@/components/lib/WwButton.vue'
import OrderClose from '../order-close/index.vue'

const props = defineProps<{
  order: any
}>()

const orderCloseRef = ref()
const orderId = ref('')

const handleCloseOrder = (id: string) => {
  orderCloseRef.value.dialogVisible = true
  orderId.value = id
}
</script>

<template>
    <div class="detail-action">
      <div class="state">
        <span class="iconfont icon-order-unpay"></span>
        <p>待支付</p>
      </div>
      <div class="info">
        <p>订单编号：{{ order.id }}</p>
        <p>下单时间：{{ order.createTime }}</p>
      </div>
      <div class="btn">
        <!-- 待付款 -->
        <template v-if="order.orderState === 1">
          <WwButton @click="$router.push('/authorize/pay?id='+order.id)" type="primary" size="small">立即付款</WwButton>
          <WwButton @click="handleCloseOrder(order.id)" type="gray" size="small">取消订单</WwButton>
        </template>
        <!-- 待发货 -->
        <template v-if="order.orderState === 2">
          <WwButton type="primary" size="small">再次购买</WwButton>
        </template>
        <!-- 待收货 -->
        <template v-if="order.orderState === 3">
          <WwButton type="primary" size="small">确认收货</WwButton>
          <WwButton type="plain" size="small">再次购买</WwButton>
        </template>
        <!-- 待评价 -->
        <template v-if="order.orderState === 4">
          <WwButton type="primary" size="small">再次购买</WwButton>
          <WwButton type="plain" size="small">评价商品</WwButton>
          <WwButton type="gray" size="small">申请售后</WwButton>
        </template>
        <!-- 已完成 -->
        <template v-if="order.orderState === 5">
          <WwButton type="primary" size="small">再次购买</WwButton>
          <WwButton type="plain" size="small">查看评价</WwButton>
          <WwButton type="gray" size="small">申请售后</WwButton>
        </template>
        <!-- 已取消 -->
        <OrderClose ref="orderCloseRef" :orderId="orderId" />
      </div>
    </div>
</template>

<style scoped lang="less">
.detail-action {
  height: 180px;
  width: 100%;
  display: flex;
  align-items: center;
  .state {
    width: 220px;
    text-align: center;
    .iconfont {
      font-size: 40px;
      color: @themeColor;
    }
    p {
      font-size: 16px;
      color: #666;
      margin-bottom: 10px;
    }
  }
  .info {
    width: 240px;
    line-height: 30px;
    p {
      color: #999;
    }
  }
  .btn {
    flex: 1;
    text-align: right;
    margin-right: 100px;
    .xtx-button {
      margin-left: 20px;
    }
  }
}
</style>
