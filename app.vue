<script setup lang="ts">
import Notify from '@/components/notify/Notify.vue'
</script>

<template>
  <!-- notify component -->
  <client-only>
    <Notify />
  </client-only>
  <!-- page layout -->
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
