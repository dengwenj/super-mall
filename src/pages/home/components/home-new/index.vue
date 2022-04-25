<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { getNew } from '@/services/api/home'

import HomePanel from '../home-panel/index.vue'
import WwMore from '@/components/lib/WwMore.vue'
import HomeSkeleton from '../home-skeleton/index.vue'

const goodsList = ref<any[]>([])

onMounted(async () => {
  const res = await getNew()
  goodsList.value = res.result
})
</script>

<template>
  <div class="home-new">
    <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template #right>
        <WwMore path="/"/>
      </template>

      <!-- 内容 -->
      <HomeSkeleton v-if="!goodsList.length" />
      <ul v-else class="goods-list">
        <li v-for="item in goodsList" :key="item.id">
          <router-link :to="`/product/${item.id}`">
            <img :src="item.picture" alt="">
            <p class="name ellipsis">{{item.name}}</p>
            <p class="price">&yen;{{item.price}}</p>
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
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
