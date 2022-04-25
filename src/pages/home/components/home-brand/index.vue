<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElCarousel, ElCarouselItem } from 'element-plus'

import { getBrand } from '@/services/api/home'
 
import HomePanel from '../home-panel/index.vue'
import WwMore from '@/components/lib/WwMore.vue'

const isAutoplay = ref(true)
const brand = ref<any[]>([])

onMounted(() => {
  getBrand(10).then((data) => {
    for (let i = 0; i < data.result.length; i++) {
      const arr1 = data.result.slice(i * 5, (i + 1) * 5)
      if (!arr1.length) return
      brand.value.push(arr1)
    }
  })
})

const handleChange = () => {
  isAutoplay.value = false
}
</script>

<template>
  <div>
    <HomePanel title="热门品牌" sub-title="国际经典 品质保证">
      <template #right>
        <WwMore />
      </template>
      <ElCarousel 
        class="list" 
        indicator-position="none" 
        :interval="300"
        :autoplay="isAutoplay" 
        @change="handleChange"
      >
        <el-carousel-item style="display: block;" v-for="item in brand" :key="item.id">
          <template v-for="item2 in item" :key="item2.id">
          <router-link to="/">
            <img :src="item2.picture" alt="">
          </router-link>
          </template>
        </el-carousel-item>
      </ElCarousel>
    </HomePanel>
  </div>
</template>

<style scoped lang='less'>
.home-panel {
  background:#f5f5f5
}

.list {
  img {
    margin-right: 8px;
    width: 240px;
    height: 305px;
  }
  :nth-child(5) {
    margin-right: 0px;
  }
}
</style>
