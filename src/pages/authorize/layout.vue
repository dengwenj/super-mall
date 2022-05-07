<script setup lang="ts">
import MyAside from '@/components/my-aside/index.vue'
</script>

<template>
  <div class="container">
    <MyAside />
    <article class="article">
      <!-- 三级路由 -->
      <RouterView />
    </article>
  </div>
</template>

<style scoped lang="less">
.container {
  display: flex;
  padding-top: 20px;
  .article {
    width: 1000px;
  }
}
</style>