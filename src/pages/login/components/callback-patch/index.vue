<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

import { useStore } from '@/store'
import { checkOnly, QQPatchcode, QQLoginPatch } from '@/services/api/login' 

const props = defineProps<{
  unionId: string
}>()

const username = ref('')
const validWithName = ref('')
const isTime60Code = ref(false)
const time60Code = ref(60)
const inputRef = ref<HTMLInputElement>()
const messageRef = ref<HTMLInputElement>()
const isInputTs = ref(false)
const ruleValue = ref('')
const isLoading = ref(false)
const phone = ref('')
const password = ref('')

const route = useRoute()
const router = useRouter()
const store = useStore()

/**
 * 处理函数
 */
const handleFocus = async () => {
  const res = await checkOnly(username.value)
  if (res.result.valid) {
    validWithName.value = '用户已存在'
  } else {
    validWithName.value = ''
  }
}

// 发送验证码
const handleCode = async () => {
  if (!(inputRef.value?.value.length! > 6)) {
    ruleValue.value = '手机号必须大于 6 位'
    isInputTs.value = true
    return
  }

  isInputTs.value = false
  isTime60Code.value = true

  try {
    await QQPatchcode(inputRef.value?.value!)

    let timer: NodeJS.Timer
    timer = setInterval(() => {
      if (time60Code.value === 0) {
        isTime60Code.value = false
        time60Code.value = 60
        isLoading.value = false
        clearInterval(timer)
      }

      if (!route.fullPath.includes('/login')) {
        clearInterval(timer)
      }

      // 模拟两秒钟添加上验证码
      if (time60Code.value === 58) {
        console.log(messageRef.value!);
        
        messageRef.value!.value = '123456'
      }

      time60Code.value--
    }, 1000)
  } catch (error: any) {
    isTime60Code.value = false
    if (error.response.data.message === '验证码已发送') {
      ElMessage.error('网络错误')
    } else {
      ElMessage.error(error.response.data.message)
    }
  }
}

// 立即提交
const handleSubmit = async () => {
  if (!(messageRef.value?.value && inputRef.value?.value)) {
    ElMessage.warning('请填写完整')
    return
  }

  isLoading.value = true 
  try {
    const res = await QQLoginPatch(props.unionId, { mobile: phone.value , code: messageRef.value!.value, account: username.value, password: password.value })
    isLoading.value = false
    store.commit('user/setUser', res.result)
    router.push(store.state.user.redirectUrl)
    ElMessage.success('完善信息成功~')
    await store.dispatch('cart/mergeCart')
    store.dispatch('cart/getNewGoods')
  } catch (error) {
    ElMessage.error('绑定失败')
  }
}
</script>

<template>
  <div class="xtx-form">
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-user"></i>
        <input class="input" type="text" v-model="username" placeholder="请输入用户名" @blur="handleFocus" />
        <span style="color: #ea3323;">{{ validWithName }}</span>
      </div>
      <div class="error"></div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <input class="input" ref="inputRef" v-model="phone" type="text" placeholder="请输入手机号" />
        <span v-if="isInputTs" style="color: #ea3323;">{{ ruleValue }}</span>
      </div>
      <div class="error"></div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <input ref="messageRef" class="input" type="text" placeholder="请输入验证码" />
        <span v-if="!isTime60Code" @click="handleCode" class="code">发送验证码</span>
        <span v-else class="code" style="cursor: not-allowed">{{ time60Code }} s</span>
      </div>
      <div class="error"></div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <input class="input" v-model="password" type="password" placeholder="请输入密码" />
      </div>
      <div class="error"></div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <input class="input" type="password" placeholder="请确认密码" />
      </div>
      <div class="error"></div>
    </div>
    <a href="javascript:;" class="submit" @click="handleSubmit" :style="isLoading ? { cursor: 'not-allowed', backgroundColor: '#bbb' } : ''">立即绑定</a>
  </div>
</template>

<style scoped lang='less'>
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
