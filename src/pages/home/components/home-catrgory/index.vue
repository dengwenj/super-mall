<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { ElSkeleton, ElSkeletonItem } from 'element-plus'

import { useStore } from '@/store'
import { getBrand } from '@/services/api/home'

import type { IMenuList } from './types'

/**
 * 状态
 */
const goods = ref<any[]>([])
const categoryId = ref('')
const store = useStore()
const brand = reactive<{
  id: string
  name: string
  children: { id: string, name: string }[]
  brands: any[]
}>({
  id: 'brand',
  name: '品牌',
  children: [{ id: 'brand-chilren', name: '品牌推荐' }],
  brands: []
})
const menuList = computed(() => {
  const list: IMenuList[] = store.state.category.list.map((item) => {
    return {
      id: item.id,
      name: item.name,
      children: item.children?.slice(0, 2),
      goods: item.goods
    }
  })
  list.push(brand)
  return list
})

getBrand().then((res) => {
  brand.brands = res.result
})

/**
 * 处理函数
 */
const handleMousemove = (id: string) => {
  const categoryItem = menuList.value.find((item) => item.id === id)
  categoryId.value = id
  goods.value = categoryItem?.goods || [] 
}
</script>

<template>
  <div class='home-category' @mouseleave="categoryId = ''">
    <ul class="menu">
      <li 
        :class="item.id === categoryId ? 'active' : ''" 
        v-for="item in menuList" :key="item.id" 
        @mousemove="handleMousemove(item.id || '')"
      >
        <router-link :to="`/category/${item.id}`">{{ item.name }}</router-link>
        <!-- 骨架效果 -->
        <ElSkeleton
          v-if="!item.children"
          class="ElSkeleton"
          animated
        >
          <template #template>
            <el-skeleton-item variant="text" class="el-skeleton-item"/>
            <el-skeleton-item variant="text" class="el-skeleton-item" />
          </template>
        </ElSkeleton>
        <template v-if="item.children">
          <router-link 
            v-for="sub in item.children" 
            :to="`/category/sub/${sub.id}`"
            :key="sub.id"
          >
            {{ sub.name }}
          </router-link>
        </template>
      </li>
    </ul>

    <!-- 弹层 -->
    <div class="layer">
      <h4>{{ categoryId === 'brand' ? '品牌' : '分类' }}推荐 <small>根据您的购买或浏览记录推荐</small></h4>
      <ul v-if="goods.length">
        <li v-for="item in goods" :key="item.id">
          <router-link :to="'/'">
            <img :src="item.picture" alt="">
            <div class="info">
              <p class="name ellipsis-2">{{ item.name }}</p>
              <p class="desc ellipsis">{{ item.desc }}</p>
              <p class="price"><i>¥</i>{{ item.price }}</p>
            </div>
          </router-link>
        </li>
      </ul>

      <ul v-if="categoryId === 'brand'">
        <li class="brand" v-for="item in brand.brands" :key="item.id">
          <router-link to="/">
            <img :src="item.picture" alt="">
            <div class="info">
              <p class="place"><i class="iconfont icon-dingwei"></i>{{ item.place }}</p>
              <p class="name ellipsis">{{ item.name }}</p>
              <p class="desc ellipsis-2">{{ item.desc }}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang='less'>
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0,0,0,0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &:hover {
        background: @themeColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
    .active {
      background: @themeColor;
    }
  }
  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255,255,255,0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    padding: 0 15px;
    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;
      small {
        font-size: 16px;
        color: #666;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;
        &:nth-child(3n) {
          margin-right: 0;
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover {
            background: #e3f9f4;
          }
          img {
              width: 95px;
              height: 95px;
          }
          .info {
            padding-left: 10px;
            line-height: 24px;
		    width: 190px;
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: @priceColor;
              i {
                font-size: 16px;
              }
            }
          }
        }
      }
      li.brand {
        height: 180px;
        a {
          align-items: flex-start;
          img {
            width: 120px;
            height: 160px;
          }
          .info {
            p {
              margin-top: 8px;
            }
            .place {
              color: #999;
            }
          }
        }
      }
    }
  }
  &:hover {
    .layer {
      display: block;
    }
  }
}
.ElSkeleton {
  width: 150px; 
  display: inline-block;
  
  .el-skeleton-item {
    width: 45%;
    margin-right: 5px;
    --el-skeleton-color:#999;
  }
}
</style>
