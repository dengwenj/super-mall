<script setup lang="ts">
import { ref } from 'vue'

import GoodsDetail from '../goods-detail/index.vue'
import GoodsComment from '../goods-comment/index.vue'

const active = ref('goodsDetail')
</script>

<template>
  <div class="goods-tabs">
    <nav>
      <a 
        @click="active = 'goodsDetail'" 
        :class="active === 'goodsDetail' ? 'active': ''"
      >
        商品详情
      </a>
      <a 
        @click="active = 'goodsComment'" 
        :class="active === 'goodsComment' ? 'active' : ''"
      >
        商品评价<span>(500+)</span>
      </a>
    </nav>
    <!-- 切换内容的地方 -->
    <GoodsDetail v-if="active === 'goodsDetail'" />
    <GoodsComment v-if="active === 'goodsComment'" />
  </div>   
</template>

<style scoped lang="less">
.goods-tabs {
  min-height: 600px;
  background: #fff;
  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;
      cursor: pointer;
      > span {
        color: @priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
      &:first-child {
        border-right: 1px solid #f5f5f5;
      }
      &.active {
        &::before {
          content: "";
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: @themeColor;
        }
      }
    }
  }
}
</style>