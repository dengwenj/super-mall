<script setup lang="ts">
import { ElEmpty } from 'element-plus'

import WwButton from '@/components/lib/WwButton.vue'
</script>

<template>
  <div class="cart-none">
    <el-empty description="购物车内还没加入商品喔~" />
    <div class="btn">
      <WwButton type="primary" @click="$router.push('/')">随便逛逛</WwButton>
    </div>
  </div>
</template>

<style scoped lang="less">
.cart-none {
  text-align: center;
  padding: 150px 0;
  background: #fff;
  p {
    color: #999999;
    padding: 20px 0;
  }
}
</style>
