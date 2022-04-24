<script setup lang="ts">
import Header from '@/components/Header/index.vue'
</script>

<template>
  <div class="app-header-sticky">
    <Header />
  </div>
</template>

<style scoped lang='less'>
.app-header-sticky {
  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid @themeColor;
    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;
      &:hover {
        color: @themeColor;
      }
    }
  }
}
</style>

