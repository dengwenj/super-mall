<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import { useStore } from '@/store'

import LoginHeader from './components/login-header/index.vue'
import LoginFooter from './components/login-footer/index.vue'
import LoginAccount from './components/login-account/index.vue'
import LoginScanCode from './components/login-scan-code/index.vue'

const isShowAccountOrScanCode = ref('account')
const route = useRoute()
const store = useStore()

if (route.query.redirectUrl) {
  store.commit('user/setRedirectUrl', route.query.redirectUrl)
}
</script>

<template>
  <LoginHeader>欢迎登录</LoginHeader>
  <section class="login-section">
    <img src="../../assets/images/loginlogo.jpeg" alt="">
    <div class="wrapper">
      <nav>
        <a
          :class="isShowAccountOrScanCode === 'account' ? 'active' : ''"
          @click="isShowAccountOrScanCode = 'account'"
        >
          账户登录
        </a>
        <a
          :class="isShowAccountOrScanCode === 'scanCode' ? 'active' : ''"
          @click="isShowAccountOrScanCode = 'scanCode'"
        >
          扫码登录
        </a>
      </nav>
      <LoginAccount v-if="isShowAccountOrScanCode === 'account'" />
      <LoginScanCode v-if="isShowAccountOrScanCode === 'scanCode'" />
    </div>
  </section>
  <LoginFooter />
</template>

<style scoped lang='less'>
.login-section {
  height: 488px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .wrapper {
    width: 380px;
    background: #fff;
    min-height: 400px;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px,0,0);
    box-shadow: 0 0 10px rgba(0,0,0,.15);
    nav {
      height: 55px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;  
      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        cursor: pointer;
        &:first-child {
          border-right: 1px solid #f5f5f5;
          text-align: left;
        }
        &.active{
          color: @themeColor;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
