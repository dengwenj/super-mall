<script setup lang="ts">
import { computed, ref } from 'vue'

import { useStore } from '@/store'

import type { IListNameSubNameAndId } from './types'

/**
 * 状态
 */
const store = useStore()
const open = ref(true)
const id = ref(localStorage.getItem('categoryId'))
const categoryList = computed(() => store.state.category.list)

/**
 * 处理函数
 */
const handleOpen = async (prop: string, isSub?: boolean, listNameSubNameAndId?: IListNameSubNameAndId) => {
  open.value = false
  id.value = prop

  if (localStorage.getItem('categoryId') !== prop) {
    if (!isSub) {
      localStorage.setItem('categoryId', prop)
    }
  }
  
  if (isSub) {
    localStorage.setItem('categoryId', listNameSubNameAndId!.listId)

    store.dispatch('category/categorySubFilterBuId', prop)
    store.commit('category/setListNameSubNameAndId', listNameSubNameAndId)
  }
}
const handleMouseleave = () => {
  open.value = true
}
const handleHome = () => {
  localStorage.setItem('categoryId', '')
  id.value = ''
}
</script>

<template>
  <ul class="app-header-nav">
    <li class="home"><router-link to="/" :class="id ? '' : 'isactive'" @click="handleHome">首页</router-link></li>
    <li v-for="item in categoryList" :key="item.id">
      <router-link
        :class="item.id === id ? 'isactive' : ''"
        @click="handleOpen(item.id || '')" 
        :to="`/category/${item.id}`"
        @mouseleave="handleMouseleave"
      >
        {{ item.name }}
      </router-link>
      <div :class="open ? 'layer' : 'layer2'">
        <ul>
          <li v-for="item2 in item.children" :key="item2.id">
            <router-link 
              @mouseleave="handleMouseleave" 
              @click="handleOpen(item2.id, true, { listId: item.id!, listName: item.name, subId: item2.id, subName: item2.name })" 
              :to="`/category/sub/${item2.id}`"
            >
              <img :src="item2.picture">
              <p>{{ item2.name }}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<style scoped lang='less'>
.app-header-nav {
  width: 820px;
  display: flex;
  justify-content: space-around;
  padding-left: 40px;
  position: relative; 
  z-index: 998;  
  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center; 
    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
    > .isactive {
      color: @themeColor;
      border-bottom: 1px solid @themeColor;
    }
    &:hover {  
      > a {
        color: @themeColor;
        border-bottom: 1px solid @themeColor;
      }
      > .layer {
        height: 132px;
        opacity: 1;
      }
    }
  }
}
.layer {
  width: 1240px;
  background-color: #fff;
  position: absolute;
  left: -200px;
  top: 56px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all .2s .1s;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;
    li {
      width: 110px;
      text-align: center;
      img {
        width: 60px;
        height: 60px;
      }
      p {
        padding-top: 10px;
      }
      &:hover {
        p {
          color: @themeColor;
        }
      }
    }
  }
}
.layer2 {
  display: none;
}
</style>
