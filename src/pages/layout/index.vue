<script setup lang="ts">

</script>

<template>
  <div class="container">
     <header>
      顶部
    </header>
    <main>
      <!-- 二级路由 -->
      <router-view />
    </main>
    <footer>
      底部
    </footer>
  </div>
</template>

<style lang="less">
@import '../../assets/styles/mixins.less';

.container {
  .dwj(100px)
}

</style>