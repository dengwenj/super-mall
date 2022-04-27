<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { useStore } from '@/store'
import { categorySubFilterById } from '@/services/api/category'

import SubFilter from './sub-filter.vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'

const categorySubFilter = ref({})
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
    const res = await categorySubFilterById(listNameSubNameAndId.value.subId)
    categorySubFilter.value = res.result
  }
})
</script>

<template>
  <div class='sub-category'>
    <div class="container">
      <!-- 面包屑 -->
      <Breadcrumb :breadcrumb="breadcrumb" />
      <!-- 筛选区 -->
      <SubFilter :categorySubFilter="categorySubFilter" />
      </div>
  </div>
</template>
