<script setup lang="ts">
import { useStore } from '@/store'

const store = useStore()

const handleId = () => {
}

</script>

<template>
  <div>{{ store.state.user.profile.id }}</div>
  <button @click="handleId">id</button>
</template>
