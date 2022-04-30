<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import axios from 'axios'

const isShow = ref(false)
const cityRef = ref()
const cityData = ref<any[]>([])
const isLoading = ref(false)


const handleClickCity = () => {
  isShow.value = !isShow.value

  if (isShow.value) {
    if ((window as any).cityData) {
      cityData.value = (window as any).cityData
    } else {
      isLoading.value = true
      axios.get('https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json')
        .then((res) => {
          (window as any).cityData = res.data
          cityData.value = res.data
          isLoading.value = false
        })
    }
  }
}

onClickOutside(cityRef, () => {
  isShow.value = false
})
</script>

<template>
  <div class="xtx-city" ref="cityRef">
    <div class="select" @click="handleClickCity" :class="isShow ? 'active' : ''">
      <span class="placeholder">请选择配送地址</span>
      <span class="value"></span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="isShow">
      <div v-if="isLoading" class="loading">加载中...</div>
      <span v-else class="ellipsis" v-for="item in cityData" :key="item.code">{{ item.name }}</span>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;  
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
    .loading {
      height: 290px;
      width: 100%;
      font-size: 20px;
      color: @themeColor;
      text-align: center;
    }
  }
}
</style>
