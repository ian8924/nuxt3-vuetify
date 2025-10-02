<script setup lang="ts">
// 这里可以添加你的逻辑
definePageMeta({
  middleware: 'auth'
})
</script>

<template>
  <!-- 主要内容 -->
  <v-main>
    <ThemeDemo />
  </v-main>
</template>
