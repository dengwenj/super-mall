<script setup lang="ts">
import { defineProps, ref, watchEffect } from 'vue'
import { ElCarousel, ElCarouselItem } from 'element-plus'

import { getGoodsRelevant } from '@/services/api/goods'

const props = defineProps<{
  goods: any
}>()

const goodsRelevant = ref()

watchEffect(async () => {
  const res = await getGoodsRelevant({
    id: props.goods.id,
    limit: 16
  })
  const arr = []
  for (let i = 0; i < res.result.length; i++) {
    if (4 * (i + 1) > res.result.length) break

    arr.push(res.result.slice(i * 4, 4 * (i + 1)))
  }
  goodsRelevant.value = arr
})
</script>

<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon" />
      <span class="title">同类商品推荐</span>
    </div>

    <el-carousel class="carousel" :interval="5000" trigger="click" height="380px" arrow="always">
      <el-carousel-item v-for="item in goodsRelevant" :key="item">
        <div class="slider">
         <router-link v-for="goods in item" :key="goods.id" :to="`/product/${goods.id}`">
           <img :src="goods.picture" alt="">
            <p class="name ellipsis">{{goods.name}}</p>
            <p class="price">&yen;{{goods.price}}</p>
          </router-link>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped lang='less'>
.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    .title {
      font-size: 20px;
      padding-left: 10px;
    }
    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid @themeColor;
      border-right: 4px solid @themeColor;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);
      &::before {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten(@themeColor, 40%);
      }
    }
  }
  .carousel {
    flex: 1;
    /deep/ .el-carousel__arrow--left {
      top: 130px;
      .el-icon {
        color: @themeColor;
      }
    }
    /deep/ .el-carousel__arrow--right {
      top: 130px;
      .el-icon {
        color: @themeColor;
      }
    }
    /deep/ .el-carousel__indicators--horizontal {
      .el-carousel__button {
        width: 10px;
        height: 10px;
        border-radius: 100%;
        background-color: #ccc;
      }
    }
    /deep/ .el-carousel__indicators--horizontal .is-active {
      .el-carousel__button {
        width: 10px;
        height: 10px;
        border-radius: 100%;
        background-color: @themeColor;
      }
    }

    .slider {
      display: flex;
      justify-content: space-around;
      padding: 0 40px;
      > a {
        width: 240px;
        text-align: center;
        img {
          padding: 20px;
          width: 230px!important;
          height: 230px!important;
        }
        .name {
          font-size: 16px;
          color: #666;
          padding: 0 40px;
        }
        .price {
          font-size: 16px;
          color: @priceColor;
          margin-top: 15px;
        }
      }
    }
  }
}
</style>
