<script setup lang="ts">
import { PhImages, PhPlus } from '@phosphor-icons/vue'
import NoDataDefault from '~/components/noData/NoDataDefault.vue'

import { useTemplateRef } from 'vue'

const el = useTemplateRef('el')
const { width } = useElementSize(el)

const activeTab = ref('all')
const list = ref([{
  id: 1,
  title: '2025/05/12 07:00 樂見的相簿',
  describe: '描述123123123',
  createTime: '2024-01-01 12:00',
  image: '/images/web/test-1.png'
}, {
  id: 2,
  title: '2025/05/12 07:00 樂見的相簿',
  describe: '描述123123123',
  createTime: '2024-01-01 12:00',
  image: '/images/web/test-1.png'
}, {
  id: 3,
  title: '2025/05/12 07:00 樂見的相簿',
  describe: '描述123123123',
  createTime: '2024-01-01 12:00',
  image: '/images/web/test-1.png'
}, {
  id: 4,
  title: '2025/05/12 07:00 樂見的相簿',
  describe: '描述123123123',
  createTime: '2024-01-01 12:00',
  image: '/images/web/test-1.png'
}, {
  id: 5,
  title: '2025/05/12 07:00 樂見的相簿',
  describe: '描述123123123',
  createTime: '2024-01-01 12:00',
  image: '/images/web/test-1.png'
}, {
  id: 6,
  title: '2025/05/12 07:00 樂見的相簿',
  describe: '描述123123123',
  createTime: '2024-01-01 12:00',
  image: '/images/web/test-1.png'
}, {
  id: 7,
  title: '2025/05/12 07:00 樂見的相簿',
  describe: '描述123123123',
  createTime: '2024-01-01 12:00',
  image: '/images/web/test-1.png'
}, {
  id: 8,
  title: '2025/05/12 07:00 樂見的相簿',
  describe: '描述123123123',
  createTime: '2024-01-01 12:00',
  image: '/images/web/test-1.png'
}, {
  id: 9,
  title: '2025/05/12 07:00 樂見的相簿',
  describe: '描述123123123',
  createTime: '2024-01-01 12:00',
  image: '/images/web/test-1.png'
}, {
  id: 10,
  title: '2025/05/12 07:00 樂見的相簿',
  describe: '描述123123123',
  createTime: '2024-01-01 12:00',
  image: '/images/web/test-1.png'
}, {
  id: 11,
  title: '2025/05/12 07:00 樂見的相簿',
  describe: '描述123123123',
  createTime: '2024-01-01 12:00',
  image: '/images/web/test-1.png'
}])

definePageMeta({
  middleware: 'auth'
})
</script>

<template>
  <v-main ref="el" class="tw-flex tw-flex-col tw-min-h-[calc(100vh-70px)] tw-bg-[#fafafa]">
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
        <div class="tw-flex tw-flex-col md:tw-flex-row">
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
          </div>
          <div class="tww-ml-5 tw-mt-4 md:tw-mt-0">
            <v-text-field
              hide-details
              bg-color="white"
              class="tw-w-full md:tw-w-[430px]"
              prepend-inner-icon="mdi-magnify"
              rounded
              flat
              placeholder="搜尋名稱"
              variant="solo"
            />
          </div>
        </div>
      </template>
      <template #right>
        <v-btn rounded>
          新建相簿 <PhPlus size="16" class="tw-ml-1" />
        </v-btn>
      </template>
    </TitleBlockDefault>
    <div class="tw-px-[40px] tw-py-[18px] tw-w-full tw-flex-1">
      <template v-if="list.length > 0">
        <div class="tw-grid tw-gap-6" :class="{ 'tw-grid-cols-2': width <= 600, 'tw-grid-cols-3': width > 600 && width <= 1000, 'tw-grid-cols-4': width > 1000 && width <= 1240, 'tw-grid-cols-5': width > 1240 }">
          <v-card
            v-for="item in list"
            :key="item.id"
            color="white"
            class="tw-p-6 tw-rounded-lg tw-mb-6 tw-min-h-[278px] tw-cursor-pointer hover:tw-shadow-lg"
            :to="`/album/${item.id}/picture`"
          >
            <div class="tw-aspect-[2/1] tw-overflow-hidden tw-rounded">
              <NuxtImg class="tw-w-full tw-h-full tw-object-cover" :src="item.image" />
            </div>
            <div class="tw-p-4">
              <div class="tw-font-medium tw-text-xl">{{ item.title }}</div>
              <div class="tw-mt-2 tw-text-sm tw-text-on-surface">{{ item.describe }}</div>
              <div class="tw-mt-1 tw-text-sm tw-text-on-surface-80">建立時間：{{ item.createTime }}</div>
            </div>
          </v-card>
        </div>
      </template>
      <template v-else>
        <NoDataDefault />
      </template>
    </div>
  </v-main>
</template>
