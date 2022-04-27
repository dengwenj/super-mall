<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { ElEmpty } from 'element-plus'

import { useStore } from '@/store'
import { getSubCategoryGoods } from '@/services/api/category'

import SubFilter from './sub-filter.vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import SubSort from './components/sub-sort/index.vue'
import GoodsItem from './components/goods-item/index.vue'

const product = ref<Record<string, any>>({})
const footerRef = ref<Element | null>(null)
const isEmpty = ref(false)
const isLoading = ref(false)
const isUnobserve = ref(false)
const params = reactive({
  page: 1,
  pageSize: 20
})
const store = useStore()

const listNameSubNameAndId = computed(() => store.state.category.listNameSubNameAndId)

const breadcrumb = [
  {
    name: '首页',
    path: '/'
  },
  {
    name: listNameSubNameAndId.value.listName!,
    path: `/category/${listNameSubNameAndId.value.listId}`
  },
  {
    name: listNameSubNameAndId.value.subName!,
  }
]

onMounted(async () => {
  if (listNameSubNameAndId.value.subId) {
    store.dispatch('category/categorySubFilterBuId', listNameSubNameAndId.value.subId)
  }
})

onMounted(async () => {
  const res = await getSubCategoryGoods(params)
  product.value = res.result
  params.page++
})

onMounted(() => {
  const observer = new IntersectionObserver(async ([{ isIntersecting }]) => {
    if (isIntersecting) {
      // 进入可视区
      if (params.page > product.value.pages) {
        isUnobserve.value = true
        isEmpty.value = true
      } else {
        isLoading.value = true

        const res = await getSubCategoryGoods(params)
        product.value.items.push(...res.result.items)
        isLoading.value = false
        params.page++
      }

      // 当全部都加载完了，就停止观察
      if (isUnobserve.value) {
        observer.unobserve(footerRef.value!)
      }
    }
  }, { threshold: 0 })
  observer.observe(footerRef.value!)
})
</script>

<template>
  <div class='sub-category'>
    <div class="container">
      <!-- 面包屑 -->
      <Breadcrumb :breadcrumb="breadcrumb" />
      <!-- 筛选区 -->
      <SubFilter />
      <!-- 结果区 -->
      <div class="goods-list">
        <!-- 排序 -->
        <SubSort />
        <!-- 列表 -->
        <ul>
          <li v-for="item in product.items" :key="item.id" >
            <GoodsItem :goods="item" />
          </li>
        </ul>
      </div>
      <!-- 没有了和判断是否进入这个可视区 -->
      <div class="footer" ref="footerRef">
        <div v-if="isLoading" class="loading">加载中...</div>
        <ElEmpty v-if="isEmpty" description="我可是有底线的 哼~" style="background-color: #fff;" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
.el-empty {
  .el-empty__description {
    p {
      font-size: 30px;
    }
  }
}
.loading {
  text-align: center;
  color: @themeColor;
  background-color: #fff;
  font-size: 20px;
}
</style>
