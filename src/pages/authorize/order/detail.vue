<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { ElSteps, ElStep } from 'element-plus'

import DetailAction from './components/detail-action/index.vue'
import Detaillogistics from './components/detail-logistics/index.vue'
import DetailInfo from './components/detail-info/index.vue'

import { getOrderDetail } from '@/services/api/order'

const order = ref()
const active = ref(0)

watchEffect(() => {
  active.value = order?.value?.orderState
})

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
    <ElSteps style="padding: 30px 0px" process-status="wait" align-center :active="active" finish-status="success">
      <ElStep title="提交订单">
        <template #description>
          {{ order.createTime }}
        </template>
      </ElStep>
      <ElStep title="付款成功">
        <template #description>
          {{ order.payTime }}
        </template>
      </ElStep>
      <ElStep title="商品发货">
        <template #description>
          {{ order.consignTime }}
        </template>
      </ElStep>
      <ElStep title="确定收货">
        <template #description>
          {{ order.evaluationTime }}
        </template>
      </ElStep>
      <ElStep title="订单完成">
        <template #description>
          {{ order.endTime }}
        </template>
      </ElStep>
    </ElSteps>
    <!-- 物流栏 -->
    <Detaillogistics :order="order" /> 
    <!-- 订单商品信息 -->
    <DetailInfo :order="order" />
  </div>
</template>

<style scoped lang="less">
.order-detail-page {
  background: #fff;
  height: 100%;
}
/deep/.el-step__head.is-success {
  color: @themeColor;
  border-color: @themeColor;
}
/deep/.el-step__title.is-success {
  color: @themeColor;
}
/deep/.el-step__description.is-success {
  color: @themeColor;
}
</style>
