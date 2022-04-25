<script setup lang="ts">
import HomeCategory from './components/home-catrgory/index.vue'
import HomeBanner from './components/home-banner/index.vue'
import HomeNew from './components/home-new/index.vue'
</script>

<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
        <!-- 轮播图 -->
        <HomeBanner class="banner" />
      </div>

      <!-- 新鲜好物 -->
      <HomeNew />
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
