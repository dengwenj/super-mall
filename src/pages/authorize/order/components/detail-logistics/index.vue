<script lang="ts" setup>
import { onMounted, ref, defineProps } from 'vue'

import { orderLogistics } from '@/services/api/order'
import { ElMessage } from 'element-plus'

const props = defineProps<{
  order: any
}>()

const logistics = ref()

onMounted(async () => {
  try {
    if (props.order.orderState === 3) {
      const res = await orderLogistics(props.order.id)
      logistics.value = res.result
    }
  } catch (error: any) {
    ElMessage.error(error.response.data)
  }
})
</script>

<template>
  <div class="detail-logistics" v-if="logistics">
    <p>
      <span>{{logistics.list[0].time}}</span>
      <span>{{logistics.list[0].text}}</span>
    </p>
    <a href="javascript:;">查看物流</a>
  </div>
</template>

<style scoped lang="less">
.detail-logistics {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  background-color: #f5f5f5;
  margin: 30px 50px 0;
  > p {
    flex: 1;
    span {
      color: #999;
      &:first-child {
        margin-right: 30px;
      }
    }
  }
  > a {
    color: @themeColor;
    text-align: center;
  }
}
</style>
