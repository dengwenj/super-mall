<script setup lang="ts">
import { computed, ref, watchEffect, nextTick, provide } from 'vue'
import { useRoute } from 'vue-router'
import { ElInputNumber, ElMessage } from 'element-plus'

import { useStore } from '@/store'
import { getGoods } from '@/services/api/goods'

import Breadcrumb from '@/components/Breadcrumb/index.vue'
import GoodsRelevant from './components/goods-relevant/index.vue'
import GoodsImage from './components/goods-image/index.vue'
import GoodsSales from './components/goods-sales/index.vue'
import GoodsName from './components/goods-name/index.vue'
import GoodsSku from './components/goods-sku/index.vue'
import WwButton from '@/components/lib/WwButton.vue'
import GoodsTabs from './components/goods-tabs/index.vue'
import GoodsHot from './components/goods-hot/index.vue'
import GoodsWarn from './components/goods-warn/index.vue'

const goods = ref()
const route = useRoute()
const num = ref(1)
const currentSku = ref()

const store = useStore()

watchEffect(async () => {
  if (route.fullPath.includes('/product')) {
    const data = await getGoods(route.params.id as string)
    // 让商品数据为null然后使用v-if的组件可以重新销毁和创建
    goods.value = null
    // 传给子

    nextTick(() => {
      goods.value = data.result
    })
  }
})

provide('goods', goods)

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
  currentSku.value = sku
}

const handleChange = (currentValue: number | undefined) => {
  // console.log(currentValue)
}

// 加入购物车
const handleAddCart = async () => {
  if (currentSku.value?.skuId) {
    const { skuId, specsText: attrsText, inventory: stock } = currentSku.value
    const { id, name, price, mainPictures } = goods.value

    await store.dispatch('cart/addCart', {
      skuId,
      attrsText,
      stock,
      id,
      name,
      price,
      nowPrice: price,
      picture: mainPictures[0],
      selected: true,
      isEffective: true,
      count: num.value
    })
    ElMessage.success('加入购物成功')
  } else {
    ElMessage.warning('请选完整规格')
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
          <GoodsSku :goods="goods" @change="changeSku" />
          <!-- 数量选择 -->
          <div class="num">
            <span>数量</span>
            <ElInputNumber v-model="num" :min="1" :max="goods.inventory" @change="handleChange" />
          </div>
          <WwButton type="primary" size="middle" style="margin: 20px 0 0 10px;" @click="handleAddCart">加入购物车</WwButton>
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant :goods="goods" />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <GoodsTabs :goods="goods" />
          <!-- 注意事项 -->
          <GoodsWarn />
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHot />
          <GoodsHot :type="2" />
        </div>
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
    .num {
      margin-left: 10px;
      color: #999;
      span {
        margin-right: 20px;
      }
    }
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
