<script setup lang="ts">
import { defineProps, withDefaults, defineEmits } from 'vue'

import getPowerSet from '@/global/power-set.js'

const props = withDefaults(defineProps<{
  goods: any,
  skuId: string
}>(), {
  skuId: ''
})

const emit = defineEmits<{
  (e: 'change', props: Record<string, any>): void
}>()

const spliter = '★'
// 根据skus数据得到路径字典对象
const getPathMap = (skus: any[]) => {
  const pathMap = {}
  skus.forEach(sku => {
    // 1. 过滤出有库存有效的sku
    if (sku.inventory) {
      // 2. 得到sku属性值数组
      const specs = sku.specs.map((spec: any) => spec.valueName)
      // 3. 得到sku属性值数组的子集
      const powerSet = getPowerSet(specs)
      // 4. 设置给路径字典对象
      powerSet.forEach((set: any) => {
        const key = set.join(spliter)
        if ((pathMap as any)[key]) {
          // 已经有key往数组追加
          (pathMap as any)[key].push(sku.id)
        } else {
          // 没有key设置一个数组
          (pathMap as any)[key] = [sku.id]
        }
      })
    }
  })
  return pathMap
}
const pathMap = getPathMap(props.goods.skus)
// console.log(pathMap)

// 得到当前选中规格集合
const getSelectedArr = (specs: any[]) => {
  const selectedArr: any[] = []
  specs.forEach((spec: any) => {
    const selectedVal = spec.values.find((val: any) => val.selected)
    selectedArr.push(selectedVal ? selectedVal.name : undefined)
  })
  return selectedArr
}

// 更新按钮的禁用状态
const updateDisabledStatus = (specs: any[], pathMap: Record<string, any>) => {
  specs.forEach((spec, i) => {
    const selectedArr = getSelectedArr(specs)
    spec.values.forEach((val: any) => {
      // 已经选中的按钮不用判断
      if (val.name === selectedArr[i]) return false
      // 未选中的替换对应的值
      selectedArr[i] = val.name
      // 过滤无效值得到key
      const key = selectedArr.filter(v => v).join(spliter)
      // 设置禁用状态
      val.disabled = !pathMap[key]
    })
  })
}
updateDisabledStatus(props.goods.specs, pathMap)

// 初始化选中状态
const initSelectedStatus = (goods: any, skuId: string) => {
  const sku = goods.skus.find((sku: any) => sku.id === skuId)
  if (sku) {
    goods.specs.forEach((spec: any, i: any) => {
      const value = sku.specs[i].valueName
      spec.values.forEach((val: any) => {
        val.selected = val.name === value
      })
    })
  }
}
initSelectedStatus(props.goods, props.skuId)

const handleClick = (values: any[], val: Record<string, any>) => {
  if (val.disabled) return false

  if (val.selected) {
    val.selected = false
  } else {
    values.forEach((item: Record<string, any>) => {
      item.selected = false
    })
    val.selected = true
  }

  updateDisabledStatus(props.goods.specs, pathMap)

  // 触发change事件将sku数据传递出去
  const selectedArr = getSelectedArr(props.goods.specs).filter(v => v)
  if (selectedArr.length === props.goods.specs.length) {
    const skuIds = (pathMap as any)[selectedArr.join(spliter)]
    const sku = props.goods.skus.find((sku: any) => sku.id === skuIds[0])
    // 传递
    emit('change', {
      skuId: sku.id,
      price: sku.price,
      oldPrice: sku.oldPrice,
      inventory: sku.inventory,
      specsText: sku.specs.reduce((p: any, n: any) => `${p} ${n.name}：${n.valueName}`, '').replace(' ', '')
    })
  } else {
    emit('change', {})
  }
}
</script>

<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img
            :class="{ selected: val.selected, disabled: val.disabled }" 
            @click="handleClick(item.values, val)" 
            v-if="val.picture" 
            :src="val.picture" :title="val.name"
          >
          <span
            v-else
            :class="{ selected: val.selected, disabled: val.disabled }" 
            @click="handleClick(item.values, val)" 
          >
            {{ val.name }}
          </span>
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