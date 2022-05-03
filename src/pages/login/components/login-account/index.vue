<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElForm, ElFormItem, ElInput, ElCheckbox, ElButton, ElCheckboxGroup, ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

import { useStore } from '@/store'
import { accountLogin, mobileLogin, mobileMessage } from '@/services/api/login'

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
const isTime60Code = ref(false)
const time60Code = ref(60)
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
const store = useStore()
const route = useRoute()
const router = useRouter()

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
        const accountOrMobilePromise = store.dispatch('user/accountOrMobile', {
          accountOrMobileLogin,
          form
        })

        try {
          await accountOrMobilePromise
          router.push(route.query.redirectUrl as string || '/')
          isLoading.value = false
          ElMessage.success('登录成功~')
        } catch (error: any) {
          ElMessage({
            type: 'error',
            message: error?.response?.data?.message || '登录失败'
          })
          isLoading.value = false
        }
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
      account: 'ceshi',
      password: '123456',
      agree: []
    }
  } else {
    form.value = {
      mobile: '13211112222',
      code: '',
      agree: []
    }
  }
}

// 发送验证码
const handleVerificationCode = (formEl: FormInstance | undefined) => {
  formEl?.validateField('mobile', async (isValid) => {
    if (isValid) {
      isTime60Code.value = true

      try {
        await mobileMessage(form.value.mobile!)

        let timer: NodeJS.Timer
        timer = setInterval(() => {
          if (time60Code.value === 0) {
            isTime60Code.value = false
            time60Code.value = 60
            clearInterval(timer)
          }

          if (!route.fullPath.includes('/login')) {
            clearInterval(timer)
          }

          // 模拟两秒钟添加上验证码
          if (time60Code.value === 58) {
            form.value.code = '123456'
          }

          time60Code.value--
        }, 1000)
      } catch (error) {
        console.log(error)
        ElMessage.error('网络错误~')
        isTime60Code.value = false
      }
    }
  })
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
          style="background-color: #dddfe5; border-color: #dddfe5; color: #666; width: 102px;" 
          type="primary" 
          @click="handleVerificationCode(ruleFormRef)"
          :disabled="isTime60Code"
        >
          <span v-if="!isTime60Code">发送验证码</span>
          <span v-else>{{ time60Code }} s</span>
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
    <!-- qq登录 -->
    <a href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback">
      <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="">
    </a>
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
