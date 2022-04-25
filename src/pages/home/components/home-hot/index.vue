<script setup lang="ts">
import { onMounted, ref } from "vue"

import { getHot } from '@/services/api/home'

import HomePanel from '../home-panel/index.vue'
import WwMore from "@/components/lib/WwMore.vue"
import HomeSkeleton from '../home-skeleton/index.vue'

const goodsList = ref<any[]>([])

onMounted(async () => {
  const res = await getHot()
  goodsList.value = res.result
})
</script>

<template>
  <div>
    <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
      <template #right>
        <WwMore path="/" />
      </template>

      <!-- 内容 -->
      <HomeSkeleton v-if="!goodsList.length" />
      <ul v-else ref="pannel" class="goods-list">
        <li v-for="item in goodsList" :key="item.id">
          <router-link to="/">
            <img :src="item.picture" alt="">
            <p class="name">{{item.title}}</p>
            <p class="desc">{{item.alt}}</p>
          </router-link>
        </li>
      </ul>
    </HomePanel>
  </div>
</template>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>