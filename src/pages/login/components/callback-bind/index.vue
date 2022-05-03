<script setup lang="ts">
import { defineProps, ref } from 'vue'
import QC from 'qc'

defineProps<{
  unionId: string | null
}>()

const nickname = ref('')
const figureurl_1 = ref('')

if (QC.Login.check()) {
  QC.api('get_user_info').success((res: any) => {
    const { nickname: name, figureurl_1: figureurl } = res.data
    nickname.value = name
    figureurl_1.value = figureurl
  })
}
</script>

<template>
  <div class="xtx-form">
    <div class="user-info">
      <img :src="figureurl_1" alt="" />
      <p>Hi，欢迎 {{ nickname }}，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <input class="input" type="text" placeholder="绑定的手机号" />
      </div>
      <div class="error"></div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <input class="input" type="text" placeholder="短信验证码" />
        <span class="code">发送验证码</span>
      </div>
      <div class="error"></div>
    </div>
    <a href="javascript:;" class="submit">立即绑定</a>
  </div>
</template>

<style scoped lang='less'>
.user-info {
    width: 320px;
    height: 70px;
    margin: 0 auto;
    display: flex;
    background: #f2f2f2;
    align-items: center;
    padding: 0 10px;
    margin-bottom: 25px;
    img {
      background: #f2f2f2;
      width: 50px;
      height: 50px;
    }
    p {
      padding-left: 10px;
    }
  }
  .code {
    position: absolute;
    right: 0;
    top: 0;
    line-height: 50px;
    width: 80px;
    color: #999;
    &:hover {
      cursor: pointer;
    }
  }
</style>