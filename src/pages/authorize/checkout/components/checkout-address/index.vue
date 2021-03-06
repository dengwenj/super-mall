<script setup lang="ts">
import { ref, onMounted, watchEffect, defineExpose } from 'vue'

import { getAddress } from '@/services/api/address-api'

import WwButton from '@/components/lib/WwButton.vue'
import HandleAddress from '../handle-address/index.vue'

import type { IAddAddressF } from '@/services/api/address-api'
import type { Ref } from 'vue'

export interface IAddressInfo extends IAddAddressF {
  id: string
}


const showAddress = ref<IAddAddressF | null>(null)
const dialogAddressVisible = ref({
  add: false,
  toggle: false,
  update: false
})
const addressList = ref<IAddressInfo[]>([])

defineExpose<{
  showAddress: Ref<IAddAddressF | null>
}>({
  showAddress
})

watchEffect(() => {
  // 默认地址，没有默认地址就用第一条地址，或没有收货地址
  if (addressList.value.length) {
    const defaultAddress = addressList.value.find((item) => item.isDefault === 0)
    if (defaultAddress) {
      showAddress.value = defaultAddress
    } else {
      showAddress.value = addressList.value[0]
    }
  }
})

onMounted(async () => {
  // 获取收货地址列表
  const res = await getAddress()
  addressList.value = res.result
})

const handleAddressList = (list: IAddressInfo[]) => {
  addressList.value = list
}

// 切换地址
const handleToggleAddress = () => {
  dialogAddressVisible.value = {
    add: true,
    toggle: true,
    update: false
  }
}

// 点击添加
const handleAddress = () => {
  dialogAddressVisible.value = {
    add: true,
    toggle: false,
    update: false
  }
}

// 切换过后显示新的地址
const handleNewShowAddress = (newAddress: any) => {
  showAddress.value = newAddress.value
}

// 修改地址
const updateAddress = () => {
  dialogAddressVisible.value = {
    add: true,
    toggle: false,
    update: true
  }
}
</script>

<template>
  <div class="checkout-address">
    <div v-if="!showAddress" class="none">
      <span>需要先添加收货地址才可以提交订单</span>
      <WwButton @click="dialogAddressVisible.add = true" type="plain" class="btn">添加地址</WwButton>
    </div>
    <div v-else class="df">
      <div class="text">
        <ul>
          <li><span>收<i/>货<i/>人：</span>{{ showAddress?.receiver }}</li>
          <li><span>联系方式：</span>{{ showAddress?.contact.slice(0, 3) + '****' + showAddress?.contact.slice(7) }}</li>
          <li><span>收货地址：</span>{{ showAddress?.fullLocation + showAddress?.address }}</li>
        </ul>
        <a href="javascript:;" @click="updateAddress">修改地址</a>
      </div>
      <div class="action">
        <WwButton type="plain" class="btn" @click="handleToggleAddress">切换地址</WwButton>
        <WwButton @click="handleAddress" type="plain" class="btn">添加地址</WwButton>
      </div>
    </div>
    <!-- 是否显示对话框 -->
    <HandleAddress
      v-if="dialogAddressVisible.add"
      v-model:dialogAddressVisible="dialogAddressVisible"
      @getAddressList="handleAddressList"
      @newShowAddress="handleNewShowAddress"
      :addressList="addressList"
      :showAddress="showAddress"
    />
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
