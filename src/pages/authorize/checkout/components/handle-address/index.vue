<script lang="ts" setup>
import { reactive, ref, defineProps, defineEmits, nextTick } from 'vue'
import { ElDialog, ElButton, ElForm, ElFormItem, ElInput, FormRules, ElMessage } from 'element-plus'

import { addAddress, getAddress } from '@/services/api/address-api'

import WwCity from '@/components/lib/WwCity.vue'

import type { IAddAddressF } from '@/services/api/address-api'
import type { ICodeMap } from './types'

defineProps<{
  dialogAddressVisible: boolean
}>()
const emits = defineEmits<{
  (e: 'update:dialogAddressVisible', prop: boolean): void
  (e: 'getAddressList', prop: IAddAddressF[]): void
}>()

const formLabelWidth = '140px'
const dialogFormVisible = ref(false)
const elFormRef = ref<InstanceType<typeof ElForm>>()
const codeObj = ref<ICodeMap | null>(null)
const fullLocation = ref<string | null>(null)
const form = reactive<IAddAddressF>({
  receiver: '',
  contact: '',
  address: '',
  postalCode: '',
  addressTags: ''
})

const phone = (rule: any, value: any, callback: any) => {
  const phoneR = /^1[3456789]\d{9}$/

  if (!phoneR.test(value)) {
    return callback(new Error('请输入格式正确的手机号'))
  }

  if (!value) {
    return callback(new Error('请输入手机号'))
  }

  callback()
}
const rules = reactive<FormRules>({
  receiver: [
    { required: true, message: '请输入收货人', trigger: 'blur' },
    { min: 2, max: 10, message: '字符在2~10之间', trigger: 'blur' },
  ],
  contact: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { trigger: 'blur', validator: phone },
  ],
  address: [
    { required: true, message: '请输入详细地址', trigger: 'blur' }
  ],
  postalCode: [
    { required: true, message: '请输入邮政编码', trigger: 'blur' }
  ],
  addressTags: [
    { required: true, message: '请输入地址标签,以英文的逗号分隔', trigger: 'blur' }
  ]
})

const handleClickClose = () => {
  emits('update:dialogAddressVisible', false)
}

const handleClickOk = async () => {
  if (!codeObj.value) {
    return ElMessage.warning('请选择地区')
  }

  emits('update:dialogAddressVisible', false)

  elFormRef.value?.validate(async (isValid) => {
    if (isValid) {
      // 验证成功发送请求
      try {
        await addAddress({
          ...codeObj.value,
          ...form,
          fullLocation: fullLocation.value!,
          isDefault: 0
        })

        // 获取收货地址列表
        const res = await getAddress()
        emits('getAddressList', res.result)
      } catch (error: any) {
        ElMessage.error(error.response.data)
      }
    }
  })
}

const handleGetCode = (codeMap: ICodeMap, address: string) => {
  codeObj.value = codeMap
  fullLocation.value = address
}
</script>

<template>
  <el-dialog 
    @close="handleClickClose" 
    v-model="dialogAddressVisible" 
    title="Shipping address"
    :width="600"
  >
    <ElForm 
      ref="elFormRef"
      :model="form"
      :rules="rules"
    >
      <ElFormItem label="收货人：" :label-width="formLabelWidth" prop="receiver">
        <ElInput v-model="form.receiver" placeholder="请输入收货人" />
      </ElFormItem>
      <ElFormItem label="手机号：" :label-width="formLabelWidth" prop="contact">
        <ElInput v-model="form.contact" placeholder="请输入手机号" />
      </ElFormItem>
      <ElFormItem label="地区：" :label-width="formLabelWidth">
        <WwCity :width="300" @getCode="handleGetCode" />
      </ElFormItem>
      <ElFormItem label="详细地址：" :label-width="formLabelWidth" prop="address">
        <ElInput v-model="form.address" placeholder="请输入详细地址" />
      </ElFormItem>
      <ElFormItem label="邮政编码：" :label-width="formLabelWidth" prop="postalCode">
        <ElInput v-model="form.postalCode" placeholder="请输入邮政编码" />
      </ElFormItem>
      <ElFormItem label="地址标签：" :label-width="formLabelWidth" prop="addressTags">
        <ElInput v-model="form.addressTags" placeholder="请输入地址标签,以英文的逗号分隔" />
      </ElFormItem>
    </ElForm>
    <template #footer>
      <span class="dialog-footer">
        <ElButton @click="handleClickClose">取消</ElButton>
        <ElButton type="primary" @click="handleClickOk">确定</ElButton>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
  .el-button--text {
    margin-right: 15px;
  }
  .el-select {
    width: 300px;
  }
  .el-input {
    width: 300px;
  }
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
</style>