<script setup lang="ts">
import { computed, ref } from 'vue'

import { useStore } from '@/store'

/**
 * 状态
 */
const open = ref(true)
const store = useStore()
const categoryList = computed(() => store.state.category.list)

/**
 * 处理函数
 */
const handleOpen = () => {
  open.value = false
}
const handleMouseleave = () => {
  open.value = true
}
</script>

<template>
  <ul class="app-header-nav">
    <li class="home"><router-link to="/">首页</router-link></li>
    <li v-for="item in categoryList" :key="item.id">
      <router-link 
        @click="handleOpen" 
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
              @click="handleOpen" 
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
