<script setup lang="ts">
import LoginHeader from './components/login-header/index.vue'
import LoginFooter from './components/login-footer/index.vue'
</script>

<template>
  <LoginHeader>欢迎登录</LoginHeader>
  <section class="login-section">
    <img src="../../assets/images/loginlogo.jpeg" alt="">
    <div class="wrapper">
      <nav>
        <a href="javascript:;">账户登录</a>
        <a href="javascript:;">扫码登录</a>
      </nav>
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
