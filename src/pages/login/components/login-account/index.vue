<script setup lang="ts">
import { ElForm, ElFormItem, ElInput, ElCheckbox, ElButton } from 'element-plus'

import { reactive, ref } from 'vue'

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})
const isShortMessage = ref(false)

// 点击登录
const onSubmit = () => {
  console.log('submit!')
}

// 切换登录方式
const handleShortMessage = () => {
  isShortMessage.value = !isShortMessage.value
}

// 发送验证码
const handleVerificationCode = () => {
  console.log('发送验证码')
}

// qq 登录
const handleQQ = () => {
  console.log('qq')
}
</script>

<template>
    <div class="short-message">
      <i class="iconfont" :class="!isShortMessage ? 'icon-msg' : 'icon-user'"></i>
      <span @click="handleShortMessage">{{ !isShortMessage ? '使用短信登录' : '使用账号登录' }}</span>
    </div>
   <el-form :model="form" label-width="80px">
    <template v-if="!isShortMessage">
      <el-form-item style="width: 340px;" label="用户名">
        <el-input v-model="form.name" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item style="width: 340px;" label="密码">
        <el-input v-model="form.name" placeholder="请输入密码" />
      </el-form-item>
    </template>
    <template v-if="isShortMessage">
      <el-form-item style="width: 340px;" label="手机号">
        <el-input v-model="form.name" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item style="width: 340px;" label="验证码">
        <el-input v-model="form.name" placeholder="请输入验证码" style="width: 148px; margin-right: 10px;" />
        <el-button style="background-color: #dddfe5; border-color: #dddfe5; color: #666;" type="primary" @click="handleVerificationCode">发送验证码</el-button>
      </el-form-item>
    </template>
    <el-form-item>
      <el-checkbox label="我已同意《隐私条款》和《服务条约》" name="type" />
    </el-form-item>
     <el-form-item style="width: 340px;">
      <el-button style="width: 100%; height: 35px; background-color: #e55b29; border-color: #e55b29;" type="primary" @click="onSubmit">登录</el-button>
    </el-form-item>
  </el-form>
  <div class="action">
    <img @click="handleQQ" src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="">
    <div class="url">
      <a href="javascript:;">忘记密码</a>
      <a href="javascript:;">免费注册</a>
    </div>
  </div>
</template>

<style scoped lang="less">
.short-message {
  color: @themeColor;
  margin: 15px 40px 15px 0;
  text-align: right;
  display: flex;
  justify-content: right;
  align-items: center;
  span {
    cursor: pointer;
    margin-left: 5px;
  }
}
/deep/.el-form-item {
  margin-bottom: 22px;
}
 /deep/.el-input__wrapper.is-focus {
  border: 1px solid @themeColor;
  box-shadow: 0 0 0 0 var(--el-input-border-color,var(--el-border-color)) inset;
}
/deep/.el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: @themeColor;
}
/deep/.el-checkbox__input.is-checked+.el-checkbox__label {
  color: @themeColor;
}
 .action {
    padding: 10px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      cursor: pointer;
    }
    .url {
      a {
        color: #999;
        margin-left: 10px;
        &:hover {
          color: @themeColor;
        }
      }
    }
  }
</style>
