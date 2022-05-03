<script setup lang="ts">
import { defineProps, ref } from 'vue'
import QC from 'qc'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

import { QQLoginBindCode } from '@/services/api/login'


defineProps<{
  unionId: string | null
}>()

const nickname = ref('')
const figureurl_1 = ref('')
const inputRef = ref<HTMLInputElement>()
const messageRef = ref<HTMLInputElement>()
const isInputTs = ref(false)
const ruleValue = ref('')
const isTime60Code = ref(false)
const time60Code = ref(60)
const route = useRoute()

if (QC.Login.check()) {
  QC.api('get_user_info').success((res: any) => {
    const { nickname: name, figureurl_1: figureurl } = res.data
    nickname.value = name
    figureurl_1.value = figureurl
  })
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
    await QQLoginBindCode(inputRef.value?.value!)

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
        // form.value.code = '123456'
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
        <input ref="inputRef" class="input" type="text" placeholder="绑定的手机号" />
        <span v-if="isInputTs" style="color: #ea3323;">{{ ruleValue }}</span>
      </div>
      <div class="error"></div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <input ref="messageRef" class="input" type="text" placeholder="短信验证码" />
        <span v-if="!isTime60Code" @click="handleCode" class="code">发送验证码</span>
        <span v-else class="code" style="cursor: not-allowed">{{ time60Code }} s</span>
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