<script setup lang="ts">
import HomeCategory from './components/home-catrgory/index.vue'
import HomeBanner from './components/home-banner/index.vue'
import HomePanel from './components/home-panel/index.vue'
import WwMore from '@/components/lib/WwMore.vue'
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
      <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
        <template #right>
          <WwMore path="/"/>
        </template>
      </HomePanel>
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
