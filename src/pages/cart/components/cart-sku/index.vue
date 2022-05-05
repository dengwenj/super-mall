<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

import { getGoodsSku } from '@/services/api/cart'

import GoodsSku from '@/pages/goods/components/goods-sku/index.vue'

const props = defineProps<{
  attrsText: string
  skuId: string
}>()

const isShowCartSku = ref(false)
const cartSkuRef = ref()
const goods = ref()
const isLoading = ref(false)

onClickOutside(cartSkuRef, () => {
  isShowCartSku.value = false
})

/**
 * 处理函数
 */
const handleClick = async () => {
  if (!isShowCartSku.value) {
    isLoading.value = true
    isShowCartSku.value = !isShowCartSku.value
    const res = await getGoodsSku(props.skuId)
    goods.value = res.result
    isLoading.value = false
    return
  }

  isShowCartSku.value = !isShowCartSku.value
}
</script>

<template>
  <div class="cart-sku" ref="cartSkuRef">
    <div class="attrs" @click="handleClick">
      <span class="ellipsis">{{ attrsText }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="layer" v-if="isShowCartSku">
      <div class="loading" v-if="isLoading">加载中...</div>
      <GoodsSku v-else :goods="goods" :skuId="skuId" />
    </div>
  </div>
</template>

<style scoped lang="less">
.cart-sku {
  height: 28px;
  border: 1px solid #f5f5f5;
  padding: 0 6px;
  position: relative;
  margin-top: 10px;
  display:inline-block;
  .attrs {
    line-height: 24px;
    display: flex;
    cursor: pointer;
    span {
      max-width: 230px;
      font-size: 14px;
      color: #999;
    }
    i {
      margin-left: 5px;
      font-size: 14px;
    }
  }
  .layer {
    position: absolute;
    left: -1px;
    top: 40px;
    z-index: 10;
    width: 400px;
    border: 1px solid @themeColor;
    box-shadow: 2px 2px 4px lighten(@themeColor,50%);
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    padding: 20px;
    &::before {
      content: "";
      width: 12px;
      height: 12px;
      border-left: 1px solid @themeColor;
      border-top: 1px solid @themeColor;
      position: absolute;
      left: 12px;
      top: -8px;
      background: #fff;
      transform: scale(.8,1) rotate(45deg);
    }
    .loading {
      height: 224px;
      color: @themeColor;
      font-size: 16px;
      text-align: center;
    }
  }
}
</style>