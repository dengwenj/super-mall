<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'
import { ArrowRight } from '@element-plus/icons-vue'

withDefaults(defineProps<{
  breadcrumb: { name: string, path?: string }[]
}>(), {
  breadcrumb: () => [{ name: '首页', path: '/' }]
})
</script>

<template>
  <ElBreadcrumb class="br" :separator-icon="ArrowRight">
    <ElBreadcrumbItem 
      v-for="breadcrumbItem in breadcrumb" 
      :to="{ path: breadcrumbItem.path || '' }" 
      :key="breadcrumbItem.name"
    >
      <span :style="breadcrumbItem.path ? { cursor: 'pointer' } : ''">{{ breadcrumbItem.name }}</span>
    </ElBreadcrumbItem>
  </ElBreadcrumb>
</template>

<style scoped lang="less">
.br {
  display: flex;
  padding: 25px 10px;
  span {
    &:hover {
      color: @themeColor;
    }
  }
}

</style>
