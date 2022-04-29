<script setup lang="ts">
import { ref,  defineProps } from 'vue'

const currentIdx = ref(0)

defineProps<{
  images: any[]
}>()
</script>

<template>
  <div class="goods-image">
    <div class="middle">
      <img :src="images[currentIdx]" alt="">
    </div>
    <ul class="small">
      <li v-for="(img, i) in images" :key="img" :class="{active: i === currentIdx}">
        <img @mouseenter="currentIdx = i" :src="img" alt="">
      </li>
    </ul>
  </div>
</template>

<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,&.active {
        border: 2px solid @themeColor;
      }
    }
  }
}
</style>
