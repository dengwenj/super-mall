<script lang="ts" setup>
import { reactive, ref, defineProps, defineEmits, onMounted } from 'vue'
import { ElDialog, ElButton, ElForm, ElFormItem, ElInput, FormRules, ElMessage } from 'element-plus'

import { addAddress, getAddress, updateAddress } from '@/services/api/address-api'

import WwCity from '@/components/lib/WwCity.vue'

import type { IAddAddressF } from '@/services/api/address-api'
import type { ICodeMap } from './types'
import type { IAddressInfo } from '../checkout-address/index.vue'

const props = defineProps<{
  dialogAddressVisible: {
    add: boolean
    toggle: boolean
    update: boolean
  },
  addressList: any[]
  showAddress: IAddressInfo
}>()
const emits = defineEmits<{
  (e: 'update:dialogAddressVisible', prop: {
    add: boolean
    toggle: boolean
    update: boolean
  }): void
  (e: 'getAddressList', prop: IAddAddressF[]): void
  (e: 'newShowAddress', prop: any): void
}>()

const formLabelWidth = '140px'
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
const clickId = ref<null | number>(null)
const newAddress = ref()
const vModel = ref()

onMounted(() => {
  vModel.value = props.dialogAddressVisible.update ? props.showAddress : form
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
  emits(
    'update:dialogAddressVisible', 
    props.dialogAddressVisible.toggle
      ? { add: false, toggle: true, update: false }
      : { add: false, toggle: false, update: false }
  )
}

// 点击确定
const handleClickOk = async () => {
  // 点击确定走添加逻辑
  if (!props.dialogAddressVisible.toggle && !props.dialogAddressVisible.update) {
    if (!codeObj.value) {
      return ElMessage.warning('请选择地区')
    }

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
          ElMessage.success('添加地址成功~')

          // 获取新的收货地址列表
          const res = await getAddress()
          emits('getAddressList', res.result)
        } catch (error: any) {
          ElMessage.error(error.response.data)
        }
      }
    })
  }

  // 点击确定走切换逻辑
  if (props.dialogAddressVisible.toggle) {
    // 切换过后新的地址
    emits('newShowAddress', newAddress)
    ElMessage.success('切换地址成功~')
  }

  // 点击确定修改逻辑
  if (props.dialogAddressVisible.update) {
    try {
      await updateAddress({
        ...props.showAddress,
        ...codeObj.value,
        fullLocation: fullLocation.value!,
      })
      ElMessage.success('修改地址成功~')

      // 点击修改过后新的获取收货地址列表
      const res = await getAddress()
      emits('getAddressList', res.result)
    } catch (error: any) {
      ElMessage.error(error.response.data)
    }
  }

  emits(
    'update:dialogAddressVisible',
    props.dialogAddressVisible.toggle
      ? { add: false, toggle: true, update: false } 
      : { add: false, toggle: false, update: false }
  )
}

const handleGetCode = (codeMap: ICodeMap, address: string) => {
  codeObj.value = codeMap
  fullLocation.value = address
}

const hanleClickItem = (id: number) => {
  clickId.value = id

  const showAddress = props.addressList.find((item) => item.id === id)
  newAddress.value = showAddress
}
</script>

<template>
  <el-dialog
    @close="handleClickClose" 
    v-model="dialogAddressVisible.add" 
    :title="
      dialogAddressVisible.toggle
      ? '切换收货地址': dialogAddressVisible.update
      ? '修改收货地址' : '添加收货地址'
    "
    :width="600"
  >
    <ElForm
      v-if="!dialogAddressVisible.toggle"
      ref="elFormRef"
      :model="props.dialogAddressVisible.update ? showAddress : form"
      :rules="rules"
    >
      <ElFormItem label="收货人：" :label-width="formLabelWidth" prop="receiver">
        <ElInput v-model="vModel.receiver" placeholder="请输入收货人" />
      </ElFormItem>
      <ElFormItem label="手机号：" :label-width="formLabelWidth" prop="contact">
        <ElInput v-model="vModel.contact" placeholder="请输入手机号" />
      </ElFormItem>
      <ElFormItem label="地区：" :label-width="formLabelWidth">
        <WwCity :width="300" @getCode="handleGetCode" :fullLocation="vModel.fullLocation" />
      </ElFormItem>
      <ElFormItem label="详细地址：" :label-width="formLabelWidth" prop="address">
        <ElInput v-model="vModel.address" placeholder="请输入详细地址" />
      </ElFormItem>
      <ElFormItem label="邮政编码：" :label-width="formLabelWidth" prop="postalCode">
        <ElInput v-model="vModel.postalCode" placeholder="请输入邮政编码" />
      </ElFormItem>
      <ElFormItem label="地址标签：" :label-width="formLabelWidth" prop="addressTags">
        <ElInput v-model="vModel.addressTags" placeholder="请输入地址标签,以英文的逗号分隔" />
      </ElFormItem>
    </ElForm>
    <div class="div" v-else>
      <div 
        @click="hanleClickItem(item.id)" 
        class="text item" 
        v-for="(item) in addressList" 
        :key="item.id"
        :class="clickId === item.id ? 'active' : ''"
      >
        <ul>
         <li><span>收<i/>货<i/>人：</span>{{item.receiver}}</li>
         <li><span>联系方式：</span>{{item.contact}}</li>
         <li><span>收货地址：</span>{{item.fullLocation.replace(/ /g,'')+item.address}}</li>
       </ul>
     </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <ElButton @click="handleClickClose">取消</ElButton>
        <ElButton type="primary" @click="handleClickOk">确定</ElButton>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="less">
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
  .div {
    height: 400px;
    overflow-y: scroll;
  }

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    &.item {
      border: 1px solid #f5f5f5;
      margin-bottom: 10px;
      cursor: pointer;
      &.active,&:hover {
        border-color: @themeColor;
        background: lighten(@themeColor,50%);
      }
      > ul {
        padding: 10px;
        font-size: 14px;
        line-height: 30px;
      }
    }
  }
</style>