<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { ElCarousel, ElCarouselItem } from 'element-plus'

import { getBanner } from '@/services/api/home'

import type { IBanner } from './types'

const elCarouselRef = ref<InstanceType<typeof ElCarousel>>()
const banner = reactive<{ banners: IBanner[] }>({
  banners: []
})
onMounted(async () => {
  const res = await getBanner()
  banner.banners = res.result
})
</script>

<template>
  <el-carousel ref="elCarouselRef" height="100%" trigger="click" :interval="5000">
    <el-carousel-item style="display: block;" v-for="item in banner.banners" :key="item.id">
      <img class="img" :src="item.imgUrl" alt="">
    </el-carousel-item>
  </el-carousel>
</template>

<style scoped lang="less">
.banner {
  .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>