<script setup lang="ts">
import { useStore } from '@/store'

const store = useStore()

const handleId = () => {
  store.commit('user/updateId', { id: 101 })
}

</script>

<template>
  <div>{{ store.state.user.profile.id }}</div>
  <button @click="handleId">id</button>
</template>
