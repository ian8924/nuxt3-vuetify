<script setup lang="ts">
</script>

<template>
  <div class="tw-px-10 tw-py-3 tw-flex tw-items-center tw-justify-between tw-border-b tw-border-surface tw-bg-white">
    <a href="/dashboard">
      <NuxtImg src="/images/web/logo.png" :width="71" class="tw-cursor-pointer" />
    </a>
    <div class="tw-flex tw-gap-6 tw-text-lg tw-font-medium tw-items-center">
      <a href="/dashboard">
        樂見平台
      </a>
      <a href="/dashboard">
        常見問題
      </a>
      <v-btn color="primary" rounded @click="$router.push('/auth?type=login')">
        登入
        <v-icon size="large" class="tw-ml-1" color="white">
          mdi-account
        </v-icon>
      </v-btn>
    </div>
  </div>
</template>
