<script setup lang="ts">
import { defineProps, ref, withDefaults } from 'vue'

import WwButton from '@/components/lib/WwButton.vue'

const props = withDefaults(defineProps<{
  userAddresses: any[]
}>(), {
  userAddresses: () => []
})

const showAddress = ref(null)

// 默认地址，没有默认地址就用第一条地址，或没有收货地址
if (props.userAddresses.length) {
  const defaultAddress = props.userAddresses.find((item) => item.isDefault === 0)
  if (defaultAddress) {
    showAddress.value = defaultAddress
  } else {
    showAddress.value = props.userAddresses[0]
  }
}
</script>

<template>
  <div class="checkout-address">
    <div v-if="!showAddress" class="none">
      <span>需要先添加收货地址才可以提交订单</span>
      <WwButton type="plain" class="btn">添加地址</WwButton>
    </div>
    <div v-else class="df">
      <div class="text">
        <ul>
          <li><span>收<i/>货<i/>人：</span>{{ showAddress?.receiver }}</li>
          <li><span>联系方式：</span>{{ showAddress?.contact.slice(0, 3) + '****' + showAddress?.contact.slice(7) }}</li>
          <li><span>收货地址：</span>{{ showAddress?.fullLocation + showAddress?.address }}</li>
        </ul>
        <a href="javascript:;">修改地址</a>
      </div>
      <div class="action">
        <WwButton type="plain" class="btn">切换地址</WwButton>
        <WwButton type="plain" class="btn">添加地址</WwButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.checkout-address {
  border: 1px solid #f5f5f5;
  .none {
    line-height: 90px;
    color: #999;
    text-align: center;
    width: 100%;
    span {
      margin-right: 100px;
    }
  }
  .df {
    display: flex;
    .text {
      flex: 1;
      min-height: 90px;
      display: flex;
      align-items: center;
      > ul {
        flex: 1;
        padding: 20px;
        li {
          line-height: 30px;
          span {
            color: #999;
            margin-right: 5px;
            > i {
              width: 0.5em;
              display: inline-block;
            }
          }
        }
      }
      > a {
        color: @themeColor;
        width: 160px;
        text-align: center;
        height: 90px;
        line-height: 90px;
        border-right: 1px solid #f5f5f5;
      }
    }
    .action {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 420px;
      text-align: center;
      .btn {
        width: 140px;
        height: 46px;
        line-height: 44px;
        font-size: 14px;
        &:first-child {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
