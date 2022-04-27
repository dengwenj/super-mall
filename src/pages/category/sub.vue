<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { useStore } from '@/store'

import SubFilter from './sub-filter.vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'

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
</script>

<template>
  <div class='sub-category'>
    <div class="container">
      <!-- 面包屑 -->
      <Breadcrumb :breadcrumb="breadcrumb" />
      <!-- 筛选区 -->
      <SubFilter />
      </div>
  </div>
</template>
