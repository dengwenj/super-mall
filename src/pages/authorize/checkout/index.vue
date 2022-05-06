<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { createOrder } from '@/services/api/order'

import Breadcrumb from '@/components/Breadcrumb/index.vue'
import WwButton from '@/components/lib/WwButton.vue'
import CheckoutAddress from './components/checkout-address/index.vue'

const order = ref()

const router = useRouter()

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
    name: '填写订单',
  }
])

onMounted(async () => {
  const res = await createOrder()
  order.value = res.result
})
</script>

<template>
  <div class="xtx-pay-checkout-page">
    <div class="container">
      <Breadcrumb :breadcrumb="breadcrumb" />
      <div class="wrapper">
        <!-- 收货地址 -->
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
          <CheckoutAddress />
        </div>
        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">单价</th>
                <th width="170">数量</th>
                <th width="170">小计</th>
                <th width="170">实付</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in order?.goods" :key="item.skuId">
                <td>
                  <a @click="router.push(`/product/${item.id}`)" href="javascript:;" class="info">
                    <img :src="item.picture" alt="">
                    <div class="right">
                      <p>{{ item.name }}</p>
                      <p>{{ item.attrsText }}</p>
                    </div>
                  </a>
                </td>
                <td>&yen;{{ item.price }}</td>
                <td>{{ item.count }}</td>
                <td>&yen;{{ item.totalPrice }}</td>
                <td>&yen;{{ item.totalPayPrice }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 金额明细 -->
        <h3 class="box-title">金额明细</h3>
        <div class="box-body">
          <div class="total">
            <dl><dt>商品件数：</dt><dd>{{ order?.summary.goodsCount }}件</dd></dl>
            <dl><dt>商品总价：</dt><dd>¥{{ order?.summary.totalPrice.toFixed(2) }}</dd></dl>
            <dl><dt>运<i></i>费：</dt><dd>¥{{ order?.summary.postFee.toFixed(2) }}</dd></dl>
            <dl><dt>应付总额：</dt><dd class="price">¥{{ order?.summary.totalPayPrice.toFixed(2) }}</dd></dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <WwButton type="primary">提交订单</WwButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-pay-checkout-page {
  .wrapper {
    background: #fff;
    padding: 0 20px;
    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }
    .box-body {
      padding: 20px 0;
    }
  }
}
.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  .info {
    display: flex;
    text-align: left;
    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }
    .right {
      line-height: 24px;
      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }
  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }
    td,th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;
      &:first-child {
        border-left: 1px solid #f5f5f5;
      }
      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}
.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;
  &.active,&:hover {
    border-color: @themeColor;
  }
}
.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;
    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }
    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;
      &.price {
        font-size: 20px;
        color: @priceColor;
      }
    }
  }
}
.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}
</style>
