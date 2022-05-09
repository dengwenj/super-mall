<script setup lang="ts">
import { defineProps } from 'vue'

import WwButton from '@/components/lib/WwButton.vue'

const props = defineProps<{
  order: any
}>()

console.log(props.order);

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
        <WwButton type="primary" size="small">评价商品</WwButton>
        <WwButton type="plain" size="small">再次购买</WwButton>
        <WwButton type="gray" size="small">申请售后</WwButton>
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
