<script setup lang="ts">
import HomeCategory from './components/home-catrgory/index.vue'
import HomeNew from './components/home-new/index.vue'
import HomeHot from './components/home-hot/index.vue'
import HomeBrand from './components/home-brand/index.vue'
import HomeProduct from './components/home-product/index.vue'
import HomeSpecial from './components/home-special/index.vue'
import Carousel from '@/components/Carousel/index.vue'
</script>

<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
        <!-- 轮播图 -->
        <Carousel class="banner" />
      </div>

      <!-- 新鲜好物 -->
      <HomeNew />
      <!-- 人气推荐 -->
      <HomeHot />
      <!-- 热门品牌 -->
      <HomeBrand />
      <!-- 产品模块 -->
      <HomeProduct />
      <!-- 最新专题 -->
      <HomeSpecial />
    </div>
  </div>
</template>

<style scoped lang="less">
  .container {
    display: flex;
    .banner {
      flex: 1;
    }
  }
</style>
