<script setup lang="ts">
import HeaderDefault from '@/components/layouts/HeaderDefault.vue'
// 這裡可以添加一些全局的佈局邏輯
</script>

<template>
  <v-app class="tw-min-h-screen tw-flex tw-flex-col">
    <HeaderDefault />
    <div class="tw-bg-[#fafafa] tw-flex-1 tw-flex tw-flex-col tw-items-center tw-justify-center">
      <v-container class="tw-flex tw-justify-center tw-items-center tw-flex-1 tw-relative">
        <div class="tw-flex tw-justify-center tw-items-center tw-w-[50%] tw-absolute tw-left-0 tw-top-[50% - 40vh] tw-h-[80vh] tw-pr-[100px]">
          <NuxtImg
            class="tw-w-[60%]"
            src="/images//web//loginLogo.png"
            width="10%"
          />
        </div>
        <div class="tw-w-[50%] tw-h-[85vh] tw-bg-white tw-bottom-0 tw-right-0 tw-absolute tw-rounded-xl">
          <NuxtPage />
        </div>
      </v-container>
    </div>
  </v-app>
</template>

<style>
body {
 background-color: #2d9e64 !important;
}
</style>
