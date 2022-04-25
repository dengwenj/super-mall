<script lang="ts">
export default {
  name: 'ww'
}
</script>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'

withDefaults(defineProps<{
  path?: string
}>(), {
  path: '/'
})
</script>

<template>
  <router-link :to="path" class="ww-more">
    <span>查看全部</span>
    <i class="iconfont icon-angle-right"></i>
  </router-link>
</template>

<style scoped lang='less'>
.ww-more {
  margin-bottom: 2px;
  span {
    font-size: 16px;
    vertical-align: middle;
    margin-right: 4px;
    color: #999;
  }
  i {
    font-size: 14px;
    vertical-align: middle;
    position: relative;
    top: 2px;
    color: #ccc;
  }
  &:hover {
    span,i {
      color: @themeColor;
    }
  }
}
</style>