<script setup lang="ts">
import { defineProps, ref } from 'vue'

defineProps<{
  pictures: any[]
}>()

const isPreviewImg = ref(false)
const imgUrl = ref('')
const isActive = ref<number | null>(null)

// 把上一次的 idx 记住，看用户这次点击的是同一个还是另一个
let pre = 0
const handleImg = (url: string, idx: number) => {
  if (pre === idx) {
    isPreviewImg.value = !isPreviewImg.value
  } else {
    pre = idx
    isPreviewImg.value = true
  }

  // 激活颜色
  if (isPreviewImg.value) {
    isActive.value = idx
  } else {
    isActive.value = null
  }

  imgUrl.value = url
}

const handleClose = () => {
  isPreviewImg.value = false
  isActive.value = null
}
</script>

<template>
  <div class="goods-comment-image">
    <div class="list">
      <a
        v-for="(url, idx) in pictures"
        :key="url"
        @click="handleImg(url, idx)"
        :class="isActive === idx ? 'active' : ''"
      >
        <img :src="url" alt="">
      </a>
    </div>
    <div class="preview" v-if="isPreviewImg">
      <img :src="imgUrl" alt="">
      <i 
        class="iconfont icon-close-new"
        @click="handleClose"
      ></i>
    </div>
  </div>
</template>

<style scoped lang="less">
.goods-comment-image {
  .list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    a {
      width: 120px;
      height: 120px;
      border:1px solid #e4e4e4;
      margin-right: 20px;
      margin-bottom: 10px;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      &.active {
        border-color: @themeColor;
      }
    }
  }
  .preview {
    width: 480px;
    height: 480px;
    border: 1px solid #e4e4e4;
    background: #f8f8f8;
    margin-bottom: 20px;
    position: relative;
    padding: 40px 0;
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        border: 0;
    }
    i {
      position: absolute;
      right: 0;
      top: 0;
      width: 30px;
      height: 30px;
      background: rgba(0,0,0,0.2);
      color: #fff;
      text-align: center;
      line-height: 30px;
      cursor: pointer;
    }
  }
}
</style>