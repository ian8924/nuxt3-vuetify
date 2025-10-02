<script setup lang="ts">
import { PhImages, PhPlus } from '@phosphor-icons/vue'

definePageMeta({
  layout: 'layout-album',
  middleware: 'auth'
})
</script>

<template>
  <v-main class="tw-flex tw-flex-col tw-min-h-[calc(100vh-70px)] tw-bg-[#fafafa]">
    <TitleBlockDefault>
      <template #left>
        <PhImages size="24" class="tw-mr-2" />
        <div class="tw-font-medium tw-text-base">
          相簿列表
        </div>
      </template>
    </TitleBlockDefault>
    <TitleBlockDefault>
      <template #left>
        <div class="tw-flex tw-items-center tw-gap-6 tw-text-sm tw-text-gray-600">
          <div class="tw-flex tw-items-center tw-cursor-pointer tw-text-[#c0c0c0]" :class="{ 'tw-text-black': activeTab === 'all' }" @click="activeTab = 'all'">
            全部 14
          </div>
          <v-divider class="tw-my-auto" vertical length="10px" />
          <div class="tw-flex tw-items-center tw-cursor-pointer tw-text-[#c0c0c0]" :class="{ 'tw-text-black': activeTab === 'in-use' }" @click="activeTab = 'in-use'">
            使用中 14
          </div>
          <v-divider class="tw-my-auto" vertical length="10px" />
          <div class="tw-flex tw-items-center tw-cursor-pointer tw-text-[#c0c0c0]" :class="{ 'tw-text-black': activeTab === 'locked' }" @click="activeTab = 'locked'">
            已鎖定 14
          </div>
          <v-divider class="tw-my-auto" vertical length="10px" />
          <v-text-field
            hide-details
            bg-color="white"
            width="430"
            prepend-inner-icon="mdi-magnify"
            rounded
            flat
            placeholder="搜尋名稱"
            variant="solo"
          ></v-text-field>
        </div>
      </template>
      <template #right>
        <v-btn rounded>
          新建相簿 <PhPlus size="16" class="tw-ml-1" />
        </v-btn>
      </template>
    </TitleBlockDefault>
    <div class="tw-px-[40px] tw-py-[18px] tw-w-full tw-flex-1">
      123
    </div>
  </v-main>
</template>
