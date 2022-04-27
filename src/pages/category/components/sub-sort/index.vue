<script setup lang="ts">
import { ref } from 'vue'

import { sort } from '@/global/constants'

const isActive = ref('默认排序')

/**
 * 处理函数
 */
const handleSort = (item: string) => {
  isActive.value = item
}

</script>

<template>
  <div class='sub-sort'>
    <div class="sort">
      <template v-for="item in sort" :key="item">
        <a :class="isActive === item ? 'active' : ''" @click="handleSort(item)" style="cursor: pointer;">
          {{ item }}
          <template v-if="item === '价格排序'">
            <i class="arrow up" />
            <i class="arrow down" />
          </template>
        </a>  
      </template>
      
    </div>
    <!-- <div class="check">
      <el-checkbox style="--el-tag-bg-color: red" label="Option 2" size="large" />
    </div> -->
  </div>
</template>

<style scoped lang='less'>
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all .3s;
      &.active {
        background: @themeColor;
        border-color: @themeColor;
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
            &.active {
            border-bottom-color: @themeColor;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: @themeColor;
          }
        }
      }
    }
  }
  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>