<script setup lang="ts">
import Notify from '@/components/notify/Notify.vue'
import dayjs from 'dayjs'

// 引入中文語言包，確保日期顯示符合中文習慣
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')
</script>

<template>
  <NuxtLoadingIndicator color="primary" />
  <!-- notify component -->
  <client-only>
    <Notify />
  </client-only>
  <!-- page layout -->
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
