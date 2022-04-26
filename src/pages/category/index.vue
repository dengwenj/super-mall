<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

import { getCategory } from '@/services/api/category'

import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Carousel from '@/components/Carousel/index.vue'
import GoodsItem from './components/goods-item/index.vue'
import WwMore from '@/components/lib/WwMore.vue'

const route = useRoute()
const list = ref<{
  children?: any[]
  id?: string
  name?: string
  picture?: any
}>({})
watchEffect(async () => {
  if (route.params.id) {
    const res = await getCategory(route.params.id as string)
    list.value = res.result
  }
})
</script>

<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <Breadcrumb :breadcrumb="[{ name: '首页', path: '/' }, {  name: list.name! }]" />
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
      <div class="ref-goods" v-for="item in list.children" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }} -</h3>
          <p class="tag">温暖柔软，品质之选</p>
          <WwMore class="ww-more" />
        </div>
        <div class="body">
          <GoodsItem :goods="goods" v-for="goods in item.goods" :key="goods.id" />
        </div>
      </div>
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
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
      .ww-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>