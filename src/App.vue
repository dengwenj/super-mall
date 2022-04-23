<script setup lang="ts">
import { useStore } from '@/store'

import request from '@/services'

const store = useStore()

const handleId = () => {
  request({
    url: '/login/code',
    params: {
      mobile: 13211112222
    }
  }).then((res) => {
    console.log(res)
  })
}

</script>

<template>
  <div>{{ store.state.user.profile.id }}</div>
  <button @click="handleId">id</button>
</template>
