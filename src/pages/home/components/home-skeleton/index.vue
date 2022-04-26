<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'

import { ElSkeleton, ElSkeletonItem } from 'element-plus'

withDefaults(defineProps<{
  width?: number
  height?: number
  item?: number
}>(), {
  width: 306,
  height: 406,
  item: 4
})

</script>

<template>
  <ElSkeleton style="display: flex;" animated>
    <template #template>
      <template v-for="i in item" :key="i">
        <ElSkeletonItem 
          variant="image" 
          :style="{
            width: width + 'px',
            height: height + 'px',
            marginRight: i === 4 ? '' : '5px'
          }" 
        />
      </template>
    </template>
  </ElSkeleton>
</template>
