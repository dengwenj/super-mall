<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import { ElDialog, ElButton, ElMessage } from 'element-plus'

import { closeOrder } from '@/services/api/order'
import { cancelReason } from '@/global/constants'

const dialogVisible = ref(false)
const curText = ref('')
const isLoading = ref(false)

const props = defineProps<{
  orderId: any
}>()

defineExpose({
  dialogVisible
})

const handleClick = async () => {
  if (curText.value === '') {
    return ElMessage.warning('请选择取消原因')
  }

  isLoading.value = true

  try {
    await closeOrder(props.orderId.value || props.orderId, curText.value)
    dialogVisible.value = false
    curText.value = ''
    isLoading.value = false
    ElMessage.success('取消订单成功~')
  } catch (error: any) {
    ElMessage.error(error.response.data)
    isLoading.value = false
  }
}

const handleC = () => {
  dialogVisible.value = false
  curText.value = ''
}
</script>

<template>
  <ElDialog
    v-model="dialogVisible"
    title="取消订单"
    width="40%"
    :before-close="handleClose"
    @close="handleC"
    style="text-align: left"
  >
     <!-- 组件内容 -->
    <div class="cancel-info">
      <p>取消订单后，本单享有的优惠可能会一并取消，是否继续？</p>
      <p class="tip">请选择取消订单的原因（必选）：</p>
      <div class="btn">
        <a
          @click="curText = item"
          v-for="item in cancelReason"
          :key="item"
          href="javascript:;"
          :class="{ active: curText === item }"
        >
          {{ item }}
        </a>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <ElButton @click="handleC">取消</ElButton>
        <ElButton :loading="isLoading" type="primary" @click="handleClick">确定</ElButton>
      </span>
    </template>
  </ElDialog>
</template>

<style lang="less" scope>
.cancel-info {
  p {
    font-size: 16px;
    line-height: 35px;
    text-align: left;
    &.tip {
      color: #999;
    }
  }
  .btn {
    padding-top: 21px;
    display: flex;
    flex-wrap: wrap;
    a {
      width: 256px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      background-color: #ffffff;
      border: 1px solid #e4e4e4;
      margin-right: 20px;
      margin-bottom: 20px;
      color: #666;
      &:nth-child(2n){
        margin-right: 0;
      }
      &:hover,&.active {
        background-color: #e3f9f4;
        border-color: @themeColor;
      }
    }
  }
}
.el-dialog {
  text-align: left;
}
</style>