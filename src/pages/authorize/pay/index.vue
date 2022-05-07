<script setup lang="ts">
import { computed, onMounted, onUpdated, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage, ElDialog, ElButton } from 'element-plus'
 
import { getOrderDetail, closeOrder } from '@/services/api/order'
import { baseURL } from '../../../../address'

import Breadcrumb from '@/components/Breadcrumb/index.vue'

const orderDetail = ref()
// 30 分钟
const time = ref(1800)
const f = ref()
const m = ref()
const dialogVisible = ref(false)

const route = useRoute()

const breadcrumb = computed(() => [
  {
    name: '首页',
    path: '/'
  },
  {
    name: '购物车',
    path: '/cart'
  },
  {
    name: '支付订单',
  }
])

onMounted(async () => {
  const res = await getOrderDetail(route.query.id as string)
  orderDetail.value = res.result
})

// 30 分钟    1 60秒 30*60 1800
let timer: NodeJS.Timeout
// 每次以上来清除
clearInterval(timer!)
timer = setInterval(() => {
  time.value--

  if (time.value > 0) {

    f.value = Math.floor(time.value / 60)

    m.value = Math.floor(time.value % 60)

    if (f.value < 10 && f.value > 1) {
      f.value = '0' + f.value
    }

    if (f.value < 1) {
      f.value = '00'
    }

    if (m.value < 10) {
      m.value = '0' + m.value
    }
  }

  if (time.value <= 0) {
    clearInterval(timer)
  }
}, 1000)

watch(time, async () => {
  if (time.value <= 0) {
    try {
      await closeOrder(route.query.id as string)
      ElMessage.info('超过未支付时间，订单已取消~')
    } catch (error: any) {
      ElMessage.error(error.response.data)
    }
  }
})

const redirect = encodeURIComponent('http://www.corho.com:8080/#/pay/callback')
const payUrl = `${baseURL}pay/aliPay?orderId=${route.query.id}&redirect=${redirect}`
</script>

<template>
  <div class="xtx-pay-page">
    <div class="container">
      <Breadcrumb :breadcrumb="breadcrumb" /> 
      <!-- 付款信息 -->
      <div class="pay-info">
        <span v-if="time > 0" class="icon iconfont icon-queren2"></span>
        <div class="tip">
          <p v-if="time > 0">订单提交成功！请尽快完成支付。</p>
          <p v-if="time > 0">支付还剩 <span>{{ f }} 分 {{ m }} 秒</span>, 超时后将取消订单</p>
          <p v-if="time <= 0">订单已经超时，已取消订单</p>
        </div>
        <div class="amount" v-if="orderDetail && time > 0">
          <span>应付总额：</span>
          <span>¥{{ orderDetail.payMoney.toFixed(2) }}</span>
        </div>
      </div>
      <!-- 付款方式 -->
      <div class="pay-type">
        <p class="head">选择以下支付方式付款</p>
        <div class="item">
          <p>支付平台</p>
          <a class="btn wx" href="javascript:;"></a>
          <a @click="dialogVisible = true" class="btn alipay" :href="payUrl" target="_blank"></a>
        </div>
        <div class="item">
          <p>支付方式</p>
          <a class="btn" href="javascript:;">招商银行</a>
          <a class="btn" href="javascript:;">工商银行</a>
          <a class="btn" href="javascript:;">建设银行</a>
          <a class="btn" href="javascript:;">农业银行</a>
          <a class="btn" href="javascript:;">交通银行</a>
        </div>
      </div>
    </div>
    <ElDialog
      v-model="dialogVisible"
      title="正在支付..."
      width="30%"
      :before-close="handleClose"
    >
      <div class="pay-wait">
        <div v-if="orderDetail">
            <p>如果支付成功：</p>
            <RouterLink :to="`/authorize/order/${orderDetail.id}`">查看订单详情></RouterLink>
            <p>如果支付失败：</p>
            <RouterLink to="/">查看相关疑问></RouterLink>
        </div>
      </div>
    </ElDialog>
  </div>
</template>

<style scoped lang="less">
.pay-info {
  background: #fff;
  display: flex;
  align-items: center;
  height: 240px;
  padding: 0 80px;
  .icon {
    font-size: 80px;
    color: #1dc779;
  }
  .tip {
    padding-left: 10px;
    flex: 1;
    p {
      &:first-child {
        font-size: 20px;
        margin-bottom: 5px;
      }
      &:last-child {
        color: #999;
        font-size: 16px;
      }
    }
  }
  .amount {
    span {
      &:first-child {
        font-size: 16px;
        color: #999;
      }
      &:last-child {
        color: @priceColor;
        font-size: 20px;
      }
    }
  }
}
.pay-type {
  margin-top: 20px;
  background-color: #fff;
  padding-bottom: 70px;
  p {
    line-height: 70px;
    height: 70px;
    padding-left: 30px;
    font-size: 16px;
    &.head {
      border-bottom: 1px solid #f5f5f5;
    }
  }
  .btn {
    width: 150px;
    height: 50px;
    border: 1px solid #e4e4e4;
    text-align: center;
    line-height: 48px;
    margin-left: 30px;
    color: #666666;
    display: inline-block;
    &.active,
    &:hover {
      border-color: @themeColor;
    }
    &.alipay {
      background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7b6b02396368c9314528c0bbd85a2e06.png) no-repeat center / contain;
    }
    &.wx {
      background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c66f98cff8649bd5ba722c2e8067c6ca.jpg) no-repeat center / contain;
    }
  }
}
.pay-wait {
    margin-top: -30px;
    display: flex;
    justify-content: center;
    p {
      margin-top: 20px;
      font-size: 14px;
    }
    a {
      color: @themeColor;
    }
  }
</style>

