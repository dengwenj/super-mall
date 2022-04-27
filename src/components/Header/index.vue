<script setup lang="ts">
import { defineProps } from 'vue'

import HeaderNav from '@/components/HeaderNav/index.vue'
import { useStore } from '@/store'

const store = useStore()

defineProps<{
  isFixed?: boolean
}>()

const handleClick = () => {
  localStorage.setItem('categoryId', '')
  store.commit('category/setCategoryId', '')
}

</script>

<template>
  <header class='app-header'>
    <div class="container">
      <h1 class="logo">
        <router-link @click="handleClick" to="/" :style="!isFixed ? '' : { height: '80px' }">
          <img class="img" src="../../assets/images/dwjww.png" alt="购物商城">
          <div class="name" :style="!isFixed ? '' : { top: '35%' }">购物商城</div>
        </router-link>
      </h1>
      <HeaderNav  />
      <div class="isFixd" v-if="!isFixed">
        <div class="search">
          <i class="iconfont icon-search"></i>
          <input type="text" placeholder="搜一搜">
        </div>
        <div class="cart">
          <a class="curr" href="#">
            <i class="iconfont icon-cart"></i><em>2</em>
          </a>
        </div>
      </div>
      <div class="right" v-else>
        <router-link to="/" >品牌</router-link>
        <router-link to="/" >专题</router-link>
      </div>
    </div>
  </header>
</template>

<style scoped lang='less'>
.app-header {
  background: #fff;
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    a {
      position: relative;
      display: block;
      height: 132px;
      width: 100%;
      .img {
        position: absolute;
        top: 50%;
        left: 45%;
        transform: translate(-50%, -50%);
        border-radius: 5px;
        width: 50px;
        height: 50px;
      }
      .name {
        position: absolute;
        top: 41%;
        left: 62%;
        font-size: 19px;
        color: @themeColor;
      }
    }
    
  }

  .isFixd {
    display: flex;
    .search {
      width: 170px;
      height: 32px;
      position: relative;
      border-bottom: 1px solid #e7e7e7;
      line-height: 32px;
      .icon-search {
        font-size: 18px;
        margin-left: 5px;
      }
      input {
        width: 140px;
        padding-left: 5px;
        color: #666;
      }
    }
    .cart {
      width: 50px;
      .curr {
        height: 32px;
        line-height: 32px;
        text-align: center;
        position: relative;
        display: block;
        .icon-cart{
          font-size: 22px;
        }
        em {
          font-style: normal;
          position: absolute;
          right: 0;
          top: 0;
          padding: 1px 6px;
          line-height: 1;
          // background: @helpColor;
          color: #fff;
          font-size: 12px;
          border-radius: 10px;
          font-family: Arial;
        }
      }
    }
  }
  
  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid @themeColor;
    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;
      &:hover {
        color: @themeColor;
      }
    }
  }
}
</style>