<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElForm, ElFormItem, ElInput, ElCheckbox, ElButton, ElCheckboxGroup } from 'element-plus'

import { accountLogin, mobileLogin } from '@/services/api/login'

import type { FormRules, FormInstance } from 'element-plus'
import type { ILoginF } from './types'

const ruleFormRef = ref<FormInstance>()
const form = ref<ILoginF>({
  account: 'ceshi',
  password: '123456',
  agree: []
})
const isShortMessage = ref(false)
const isLoading = ref(false)

const rules = reactive<FormRules>({
  account: [
    { required: true, message: '请输入用户名~', trigger: 'blur' },
    { min: 2, max: 16, message: '用户名要大于 2 个字符哦~', trigger: 'blur' }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    { min: 6, max: 16, message: '密码 6 位数以上 16 数以下~', trigger: 'blur' },
  ],
  mobile: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' }
  ],
  agree: [
    { required: true, message: '请勾选', trigger: 'blur' }
  ]
})

/**
 * 处理函数
 */
// 点击登录
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  isLoading.value = true

  const validate = (accountOrMobileLogin: <T>(props: Record<string, any>) => Promise<T>) => {
    formEl.validate(async (valid) => {
      if (valid) {
        // 发送请求
        const res = await accountOrMobileLogin(form.value)
        console.log(res)
        isLoading.value = false
      } else {
        isLoading.value = false
      }
    })
  }
  
  // 账户登录还是手机登录
  if (!isShortMessage.value) {
    validate(accountLogin)
  } else {
    validate(mobileLogin)
  }
}

// 切换登录方式
const handleShortMessage = () => {
  isShortMessage.value = !isShortMessage.value

  if (!isShortMessage.value) {
    form.value = {
      account: '',
      password: '',
      agree: []
    }
  } else {
    form.value = {
      mobile: '',
      code: '',
      agree: []
    }
  }
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
   <el-form 
    :model="form" 
    label-width="80px" 
    :rules="rules"
    ref="ruleFormRef"
    >
    <template v-if="!isShortMessage">
      <el-form-item label="用户名" prop="account">
        <el-input v-model="form.account" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码" show-password />
      </el-form-item>
    </template>
    <template v-if="isShortMessage">
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model.number="form.mobile" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input
          v-model.number="form.code"
          placeholder="请输入验证码" 
          style="width: 148px; margin-right: 10px;" 
        />
        <el-button 
          style="background-color: #dddfe5; border-color: #dddfe5; color: #666;" 
          type="primary" 
          @click="handleVerificationCode"
        >
          发送验证码
        </el-button>
      </el-form-item>
    </template>
    <el-form-item prop="agree">
      <el-checkbox-group v-model="form.agree">
        <el-checkbox label="我已同意《隐私条款》和《服务条约》" name="type" />
      </el-checkbox-group>
    </el-form-item>
     <el-form-item>
      <el-button 
        style="width: 100%; height: 35px; background-color: #e55b29; border-color: #e55b29;" type="primary" @click="submitForm(ruleFormRef)"
        :loading="isLoading"
      >
        登录
      </el-button>
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
  width: 340px;
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
