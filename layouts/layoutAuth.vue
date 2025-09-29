<script setup lang="ts">
import HeaderDefault from '@/components/layouts/HeaderDefault.vue'
// 這裡可以添加一些全局的佈局邏輯
</script>

<template>
  <v-app class="tw-min-h-screen tw-flex tw-flex-col">
    <HeaderDefault class="tw-fixed tw-top-0 tw-w-[100vw] tw-z-50" />
    <div class="tw-bg-[#fafafa] tw-flex-1 tw-flex tw-flex-col tw-items-center tw-justify-center">
      <v-container class="tw-flex tw-justify-center tw-items-center tw-flex-1 tw-relative">
        <div class="tw-hidden md:tw-flex tw-justify-center tw-items-center tw-w-[50%] tw-h-[80vh] tw-pr-[100px]">
          <NuxtImg
            class="tw-w-[320px] tw-absolute tw-top-[calc(50vh-160px)]"
            src="/images//web//loginLogo.png"
          />
        </div>
        <div class="tw-w-full md:tw-w-[50%] tw-px-6 max-w-[660px] tw-min-h-[50vh] tw-bg-white tw-mt-[90px] tw-rounded-xl">
          <NuxtPage />
        </div>
      </v-container>
    </div>
  </v-app>
</template>

<style>

</style>
