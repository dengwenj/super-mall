<script setup lang="ts">
import { useStore } from '@/store'

import type { IStore } from '@/store/types'

const store = useStore<IStore>()

const handleId = () => {
  store.commit('user/updateId', { id: 101 })
}

</script>

<template>
  <div>{{ store.state.user.profile.id }}</div>
  <button @click="handleId">id</button>
</template>
