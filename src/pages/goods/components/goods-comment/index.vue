<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref, inject, defineEmits } from 'vue'

const goods: Record<string, any> | undefined = inject('goods')

const evaluateComment = ref()
const activeByIdx = ref(0)

const emit = defineEmits<{
  (e: 'evaluateCount', evaluateCount: number): void
}>()

onMounted(async () => {
  const res = await axios.get(`https://mock.boxuegu.com/mock/1175/goods/${goods?.id}/evaluate`)
  evaluateComment.value = res.data.result
  emit('evaluateCount', evaluateComment.value.evaluateCount)
})
</script>

<template>
  <div class="goods-comment">
    <div class="head">
      <div class="data">
        <p><span>{{ evaluateComment?.salesCount }}</span><span>人购买</span></p>
        <p><span>{{ evaluateComment?.praisePercent }}</span><span>好评率</span></p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <a
            v-for="(item, index) in evaluateComment?.tags" 
            :key="item.title"
            :class="activeByIdx === index ? 'active' : ''"
            @click="activeByIdx = index"
          >
            {{ item.title }}({{ item.tagCount }})
          </a>
        </div>
      </div>
    </div>
    <div class="sort">
      <span>排序：</span>
      <a href="javascript:;" class="active">默认</a>
      <a href="javascript:;">最新</a>
      <a href="javascript:;">最热</a>
    </div>
    <div class="list"></div>
  </div>
</template>

<style scoped lang="less">
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;
    .data {
      width: 340px;
      display: flex;
      padding: 20px;
      p {
        flex: 1;
        text-align: center;
        span {
          display: block;
          &:first-child {
            font-size: 32px;
            color: @priceColor;
          }
          &:last-child {
            color: #999;
          }
        }
      }
    }
    .tags {
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;
      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }
      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        > a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;
          cursor: pointer;
          &:hover {
            border-color: @themeColor;
            background: lighten(@themeColor,50%);
            color: @themeColor;
          }
          &.active {
            border-color: @themeColor;
            background: @themeColor;
            color: #fff;
          }
        }
      }
    }
  }
  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;
    > span {
      margin-left: 20px;
    }
    > a {
      margin-left: 30px;
      &.active,&:hover {
        color: @themeColor;
      }
    }
  }
}
</style>
