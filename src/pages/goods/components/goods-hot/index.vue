<script setup lang="ts">
import { onMounted, defineProps, withDefaults, ref } from 'vue'

import { getGoodsHot } from '@/services/api/goods'

import GoodsItem from '@/pages/category/components/goods-item/index.vue'

const props = withDefaults(defineProps<{
  type?: number
}>(), {
  type: 1
})

const goodsHot = ref()

onMounted(async () => {
  const res = await getGoodsHot({
    id: 'good.id',
    limit: 3,
    type: props.type
  })
  
  goodsHot.value = res.result
})
</script>

<template>
  <div class="goods-hot">
    <h3>{{ type === 1 ? '24小时热销榜' : type === 2 ? '周热销榜' : type === 3 ? '总热销榜' : '' }}</h3>
    <div>
      <GoodsItem v-for="item in goodsHot" :key="item" :goods="item"/>  
    </div>  
  </div>
</template>

<style scoped lang="less">
.goods-hot {
  h3 {
    height: 70px;
    background: @themeColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  ::v-deep .goods-item {
    background: #fff;
    width: 100%;
    margin-bottom: 10px;
    img {
      width: 200px;
      height: 200px;
    }
    p {
      margin: 0 10px;
    }
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>