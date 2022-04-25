<script setup lang="ts">
import { ElSkeleton, ElSkeletonItem } from 'element-plus'
</script>

<template>
  <ElSkeleton style="display: flex;" animated>
    <template #template>
      <template v-for="i in 4" :key="i">
        <ElSkeletonItem 
          variant="image" 
          :style="{
            width: '306px',
            height: '406px',
            marginRight: i === 4 ? '' : '5px'
          }" 
        />
      </template>
    </template>
  </ElSkeleton>
</template>
