<script setup lang="ts">
import { onUpdated, onMounted } from 'vue'

onMounted(() => {
  console.log('onMounted')
  
})
onUpdated(() => {
  console.log('onUpdated子组件')
})
</script>

<template>
  <div class='goods-relevant'></div>
</template>

<style scoped lang='less'>
.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;
}
</style>
