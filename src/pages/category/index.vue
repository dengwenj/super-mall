<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

import { getCategory } from '@/services/api/category'

import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Carousel from '@/components/Carousel/index.vue'

const route = useRoute()
const list = ref<{
  children?: any[]
  id?: string
  name?: string
  picture?: any
}>({})
watchEffect(async () => {
  const res = await getCategory(route.params.id as string)
  list.value = res.result
  console.log(list.value);
  
})
</script>

<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <Breadcrumb :breadcrumb="[{ name: '首页', path: '/' }, {  name: '居家' }]" />
      <!-- 轮播图 -->
      <Carousel class="carousel"/>
      <!-- 全部分类 -->
      <div ref="listRef" class="sub-list">
        <h3>全部分类</h3>
        <ul v-if="Object.keys(list).indexOf('id') !== -1">
          <li v-for="item in list.children" :key="item.id">
            <a href="javascript:;">
              <img :src="item.picture" >
              <p>{{ item.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 各个分类推荐商品 -->
      
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
  .carousel {
    height: 500px;
  }

  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
      margin-top: 20px;
      background-color: #fff;
      ul {
        display: flex;
        padding: 0 32px;
        flex-wrap: wrap;
        li {
          width: 168px;
          height: 160px;
          a {
            text-align: center;
            display: block;
            font-size: 16px;
            img {
              width: 100px;
              height: 100px;
            }
            p {
              line-height: 40px;
            }
            &:hover {
              color: @themeColor;
            }
          }
        }
      }
    }
}
</style>