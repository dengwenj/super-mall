<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  goods: any
}>()

const handleClick = (values: any[], val: Record<string, any>) => {
  if (val.selected) {
    val.selected = false
  } else {
    values.forEach((item: Record<string, any>) => {
      item.selected = false
    })
    val.selected = true
  }
}
</script>

<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img :class="val.selected ? 'selected' : ''" @click="handleClick(item.values, val)" v-if="val.picture" :src="val.picture" :title="val.name">
          <span :class="val.selected ? 'selected' : ''" @click="handleClick(item.values, val)" v-else>{{ val.name }}</span>
        </template>
      </dd>
    </dl>
  </div>
</template>

<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @themeColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>