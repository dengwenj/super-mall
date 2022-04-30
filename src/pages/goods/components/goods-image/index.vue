<script setup lang="ts">
import { ref,  defineProps, watchEffect, reactive } from 'vue'
import { useMouseInElement } from '@vueuse/core'

defineProps<{
  images: any[]
}>()

const currentIdx = ref(0)
const middleRef = ref(null)
const isShow = ref(false)
const position = reactive({
  left: 0,
  top: 0
})
const bgPosition = reactive({
  backgroundPositionX: 0,
  backgroundPositionY: 0
})

const { elementX, elementY, isOutside }  = useMouseInElement(middleRef)

watchEffect(() => {
  isShow.value = !isOutside.value

  if (elementX.value < 100) {
    position.left = 0
    bgPosition.backgroundPositionX = 0
  } else if (elementX.value > 300) {
    position.left = 200
    bgPosition.backgroundPositionX = - 200 * 2
  } else {
    position.left = elementX.value - 100
    bgPosition.backgroundPositionX = - (elementX.value - 100) * 2
  }

  if (elementY.value < 100) {
    position.top = 0
    bgPosition.backgroundPositionY = 0
  } else if (elementY.value > 300) {
    position.top = 200
    bgPosition.backgroundPositionY = - 200 * 2
  } else {
    position.top = elementY.value - 100
    bgPosition.backgroundPositionY = - (elementY.value - 100) * 2
  }

})
</script>

<template>
  <div class="goods-image">
    <div 
      class="large" 
      v-show="isShow" 
      :style="{
        backgroundImage:`url(${images[currentIdx]})`,
        backgroundPositionX: bgPosition.backgroundPositionX + 'px',
        backgroundPositionY: bgPosition.backgroundPositionY + 'px'
      }"></div>
    <div class="middle" ref="middleRef">
      <img :src="images[currentIdx]" alt="">
      <div class="layer" v-show="isShow" :style="{left: position.left + 'px', top: position.top + 'px'}"></div>
    </div>
    <ul class="small">
      <li v-for="(img, i) in images" :key="img" :class="{active: i === currentIdx}">
        <img @mouseenter="currentIdx = i" :src="img" alt="">
      </li>
    </ul>
  </div>
</template>

<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 90;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    position: relative;
    cursor: move;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0,0,0,.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,&.active {
        border: 2px solid @themeColor;
      }
    }
  }
}
</style>
