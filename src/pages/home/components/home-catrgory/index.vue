<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useStore } from '@/store'

import type { IMenuList } from './types'

/**
 * 状态
 */
const store = useStore()
const brand = reactive({
  id: 'brand',
  name: '品牌',
  children: [{ id: 'brand-chilren', name: '品牌推荐' }]
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
</script>

<template>
  <div class='home-category'>
    <ul class="menu">
      <li v-for="item in menuList" :key="item.id">
        <router-link :to="`/category/${item.id}`">{{ item.name }}</router-link>
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
  }
}
</style>
