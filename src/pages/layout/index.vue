<script setup lang="ts">
import Navbar from '@/components/NavBar/index.vue'
</script>

<template>
  <div class="container">
    <!-- 顶部通栏 -->
    <Navbar />

    <main>
      <!-- 二级路由 -->
      <router-view />
    </main>
    <footer>
      底部
    </footer>
  </div>
</template>
