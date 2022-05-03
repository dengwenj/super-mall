<script setup lang="ts">
import { onMounted, ref } from 'vue'
import QC from 'qc'
import { useRouter } from 'vue-router'

import { QQLogin } from '@/services/api/login'
import { useStore } from '@/store'

import LoginHeader from './components/login-header/index.vue'
import LoginFooter from './components/login-footer/index.vue'
import CallbackBind from './components/callback-bind/index.vue'
import CallbackPatch from './components/callback-patch/index.vue'


const isShowLoading = ref(true)

const store = useStore()
const router = useRouter()

onMounted(() => {
  if (QC.Login.check()) {
    QC.Login.getMe(async (openId: any) => {
      try {
        // 登录成功，说明该数据库里面有你的 qq 原来登录过 《注册过已绑定》
        const res = await QQLogin({ unionId: openId, source: 1 })
        const { id, account, avatar, mobile, nickname, token } = res.result
        store.commit('user/setUser', { id, account, avatar, mobile, nickname, token })
        router.push(store.state.user.redirectUrl)
      } catch (error: any) {
        // 登录失败，数据库里没有这个 qq 《注册过没绑定 或 没注册没绑定》
        console.log(error.response.data)
        isShowLoading.value = false
      }
    })
  }
})

const hasAccount = ref(true)
const nickname = ref(null)
const avatar = ref(null)

</script>

<template>
  <LoginHeader>联合登录</LoginHeader>
  <div class="showLoading" v-if="isShowLoading">
    跳转中请稍等...
  </div>
  <section class="container" v-else>
    <nav class="tab">
      <a @click="hasAccount=true" :class="{active:hasAccount}" href="javascript:;">
        <i class="iconfont icon-bind" />
        <span>已有账号，请绑定手机</span>
      </a>
      <a @click="hasAccount=false" :class="{active:!hasAccount}" href="javascript:;">
        <i class="iconfont icon-edit" />
        <span>没有账号，请完善资料</span>
      </a>
    </nav>
    <div class="tab-content" v-if="hasAccount">
      <CallbackBind :nickname="nickname" :avatar="avatar" />
    </div>
    <div class="tab-content" v-else>
      <CallbackPatch />
    </div>
  </section>
  <LoginFooter />
</template>

<style scoped lang='less'>
.showLoading {
  height: 730px;
  background-color: #fff;
  width: 1240px;
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: @themeColor;
  font-size: 26px;
  margin-left: 150px;
}
.container {
  padding: 25px 0;
}
.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;
  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;
    i {
      font-size: 22px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      margin-left: 4px;
    }
    &.active {
      color: @themeColor;
      border-color: @themeColor;
    }
  }
}
.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>
