<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

import { getGoods } from '@/services/api/goods'

import Breadcrumb from '@/components/Breadcrumb/index.vue'
import GoodsRelevant from './components/goods-relevant/index.vue'
import GoodsImage from './components/goods-image/index.vue'
import GoodsSales from './components/goods-sales/index.vue'
import GoodsName from './components/goods-name/index.vue'
import GoodsSku from './components/goods-sku/index.vue'

const goods = ref()
const route = useRoute()

watchEffect(async () => {
  if (route.fullPath.includes('/product')) {
    const data = await getGoods(route.params.id as string)
    goods.value = data.result
    console.log(data.result)
  }
})

const breadcrumb = computed(() => [
  {
    name: goods.value?.categories[1].name,
    path: goods.value?.categories[1].id
  },
  {
    name: goods.value?.categories[0].name,
    path: goods.value?.categories[0].id
  },
  {
    name: goods.value?.name,
  }
])

const changeSku = (sku: Record<string, any>) => {
  console.log(sku)

  if (sku.skuId) {
    goods.value.price = sku.price
    goods.value.oldPrice = sku.oldPrice
    goods.value.inventory = sku.inventory
  }
}
</script>

<template>
  <div class='xtx-goods-page' v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <Breadcrumb :breadcrumb="breadcrumb" />
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImage :images="goods.mainPictures" /> 
          <GoodsSales />
        </div>
        <div class="spec">
          <GoodsName :goods="goods" />
          <GoodsSku :goods="goods" sku-id="300078207" @change="changeSku" />
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs"></div>
          <!-- 注意事项 -->
          <div class="goods-warn"></div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='less'>
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
