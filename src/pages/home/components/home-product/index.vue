<script setup lang="ts">
import { useStore } from '@/store'
import { getGoods } from '@/services/api/home'
import { useLazyData } from '@/hooks'

import HomePanel from '../home-panel/index.vue'
import HomeGoods from '../home-goods/index.vue'
import WwMore from '@/components/lib/WwMore.vue'

const store = useStore()
const [homeProductRef, product] = useLazyData(getGoods)

/**
 * 处理函数
 */
const handleClick = (id: string) => {
  store.dispatch('category/categorySubFilterBuId', id)
}
</script>

<template>
  <div ref="homeProductRef" class="home-product">
    <HomePanel :title="item.name" v-for="item in product" :key="item.id">
      <template #right>
        <div class="sub">
          <router-link 
            v-for="sub in item.children" 
            :to="`/category/sub/${sub.id}`"
            @click="handleClick(sub.id)"
          >
            {{ sub.name }}
          </router-link>
        </div>
        <WwMore :path="`/category/${item.id}`" />
      </template>
      <div class="box">
        <router-link class="cover" :to="`/category/${item.id}`">
          <img v-lazy="item.picture" alt="">
          <strong class="label">
            <span>{{ item.name }}馆</span>
            <span>{{ item.saleInfo }}</span>
          </strong>
        </router-link>
        <ul class="goods-list">
          <li v-for="goodsItem in item.goods" :key="goodsItem.id">
            <HomeGoods :goodsItem="goodsItem" />
          </li>
        </ul>
      </div>
    </HomePanel>
  </div>
</template>

<style scoped lang='less'>
.home-product {
  background: #fff;
  height: 2900px;
  .sub {
    margin-bottom: 2px;
    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;
      &:hover {
        background: @themeColor;
        color: #fff;
      }
      &:last-child {
        margin-right: 80px;
      }
    }
  }
  .box {
    display: flex;
    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover
      }
      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0,-50%,0);
        span {
          text-align: center;
          &:first-child {
            width: 76px;
            background: rgba(0,0,0,.9);
          }
          &:last-child {
            flex: 1;
            background: rgba(0,0,0,.7);
          }
        }
      }
    }
    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;
        &:nth-last-child(-n+4) {
          margin-bottom: 0;
        }
        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
