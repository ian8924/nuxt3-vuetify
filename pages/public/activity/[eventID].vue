<script setup lang="ts">
import { getActivityByIdAPI } from '@/api/activity/info.api'
import type { Activity } from '@/types/interface/activity.interface'
import { PhCalendarDots, PhCube, PhMapPinLine } from '@phosphor-icons/vue'
import dayjs from 'dayjs'

const route = useRoute()
const eventID = route.params.eventID as string

const activityInfo: Ref<Activity | null> = ref(null)

const guests = computed(() => {
  return activityInfo.value?.participants.filter(participant => participant.type === 'guest').reverse() || []
})

const organizers = computed(() => {
  return activityInfo.value?.participants.filter(participant => participant.type === 'org').reverse() || []
})

const getActivityInfo = async () => {
  if (!eventID)
    return

  const { data, success } = await getActivityByIdAPI(eventID)
  if (success && data) {
    activityInfo.value = data.data
  }
}

const openLink = (url: string) => {
  window.open(url, '_blank')
}

onMounted(() => {
  getActivityInfo()
})

definePageMeta({
  layout: 'layout-public'
})
</script>

<template>
  <v-main class="tw-bg-background">
    <div :style="{ backgroundImage: `url(${activityInfo?.coverPhotoUrl})`, filter: 'blur(10px)' } " class="tw-hidden sm:tw-block tw-absolute tw-bg-cover tw-bg-center tw-h-[600px] tw-w-full tw-mb-20" />
    <v-container class="tw-z-10 tw-relative tw-bg-white tw-rounded-lg  tw-max-w-3xl tw-p-[0px]!">
      <div class="tw-w-full tw-shadow-lg">
        <!-- 相簿資訊 -->
        <div class="tw-flex-col sm:tw-flex-row tw-flex tw-gap-6 sm:tw-py-6">
          <div class="tw-w-full tw-rounded-lg tw-aspect-[4/3] tw-object-cover tw-relative">
            <nuxt-img
              v-if="activityInfo?.coverPhotoUrl"
              :src="activityInfo?.coverPhotoUrl"
              class="tw-w-full tw-h-full tw-rounded-lg tw-object-cover"
            />
          </div>
        </div>
        <div class="tw-py-4 tw-px-6">
          <!-- 標頭 -->
          <div class="tw-full tw-flex tw-justify-between tw-items-center tw-mb-4">
            <h1 class="tw-text-3xl tw-font-bold">{{ activityInfo?.name }}</h1>
            <div class="tw-flex tw-items-center tw-gap-2 tw-text-xl tw-font-medium tw-px-6 tw-py-2">
              <NuxtImg v-if="activityInfo?.theme" class="tw-w-6 tw-h-6" :src="activityInfo?.theme.iconUrl" />
              {{ activityInfo?.theme?.name }}
            </div>
          </div>
          <!-- 地點 -->
          <div v-if="activityInfo?.location" class="tw-flex tw-items-center tw-my-4 tw-mt-8 tw-gap-2">
            <PhMapPinLine size="22" class="tw-mr-2 tw-text-gray-600" />
            {{ activityInfo?.location }}
          </div>
          <!-- 日期時間 -->
          <div class="tw-flex tw-items-center tw-mb-4 tw-gap-6 tw-font-medium">
            <div v-if="activityInfo?.startedAt && activityInfo?.endedAt" class="tw-flex tw-items-center tw-mb-4 tw-gap-2">
              <PhCalendarDots size="22" class="tw-mr-2 tw-text-gray-600" />
              {{ dayjs(activityInfo?.startedAt).format('YYYY-MM-DD HH:mm') }} - {{ dayjs(activityInfo?.endedAt).format('YYYY-MM-DD HH:mm') }}
            </div>
            <div v-if="activityInfo?.activityTime" class="tw-flex tw-items-center tw-mb-4 tw-gap-2">
              <PhCalendarDots size="22" class="tw-mr-2 tw-text-gray-600" />
              {{ activityInfo?.activityTime }}
            </div>
          </div>
          <!-- Tags -->
          <div>
            <v-chip
              v-for="tag in activityInfo?.tags"
              :key="tag.id"
              class="tw-mr-2 tw-mb-2 tw-bg-gray-200 tw-text-gray-800"
              color="on-surface"
              variant="flat"
            >
              # {{ tag.name }}
            </v-chip>
          </div>
          <!-- Link Buttons -->
          <div>
            <v-btn
              v-for="item in activityInfo?.links"
              :key="item.id"
              target="_blank"
              class="tw-mr-4 tw-mt-4"
              variant="outlined"
              @click="openLink(item.target)"
            >
              {{ item.text }}
            </v-btn>
          </div>
          <!-- 活動簡介 -->
          <div class="tw-py-10">
            <div class="tw-flex tw-items-center tw-text-xl tw-font-bold tw-gap-2">
              <PhCube size="24px" />  活動簡介
            </div>
            <div class="tw-my-3" v-html="activityInfo?.description?.replaceAll('\n', '<br/>')">
            </div>
          </div>
          <!-- 精選照片 -->
          <div class="tw-py-10">
            <div class="tw-flex tw-items-center tw-text-xl tw-font-bold tw-gap-2">
              <PhCube size="24px" />  精選照片
            </div>
            <div class="tw-my-3" v-html="activityInfo?.description">
            </div>
          </div>
          <!-- 活動相簿 -->
          <div class="tw-py-10">
            <div class="tw-flex tw-items-center tw-text-xl tw-font-bold tw-gap-2">
              <PhCube size="24px" />  活動相簿
            </div>
            <div class="tw-my-3" v-html="activityInfo?.description">
            </div>
          </div>
        </div>
      </div>
      <div v-if="guests.length" class="tw-flex tw-flex-col tw-items-center tw-w-full tw-justify-center tw-mt-10">
        <div class="tw-w-full  tw-py-10 tw-px-6 tw-flex tw-flex-col tw-items-center tw-border-b tw-border-outline-variant tw-border-dashed">
          <div class="tw-mx-auto tw-font-bold tw-mb-8">活動來賓</div>
          <div class="tw-flex tw-gap-5">
            <div
              v-for="guest in guests"
              :key="guest.id"
              :class="[guest.url ? 'tw-cursor-pointer' : '']"
              class="tw-mb-4 tw-flex tw-flex-col tw-items-center tw-px-4 tw-gap-1"
              @click="guest.url ? openLink(guest.url) : null"
            >
              <NuxtImg
                v-if="guest.avatarUrl"
                :src="guest.avatarUrl"
                class="tw-w-[100px] tw-h-[100px] tw-rounded-full tw-object-cover tw-mb-2 tw-shadow-lg"
              />
              <div class="tw-font-semibold tw-text-md">{{ guest.title }}</div>
              <div class="tw-text-xl tw-font-bold">{{ guest.name }}</div>
            </div>
          </div>
        </div>
        <div v-if="organizers.length" class="tw-w-full tw-py-10 tw-flex tw-flex-col tw-justify-center tw-px-6">
          <div class="tw-mx-auto tw-font-bold tw-mb-8">活動單位</div>
          <div class="tw-flex tw-flex-wrap tw-flex tw-justify-center">
            <div
              v-for="organizer in organizers"
              :key="organizer.id"
              :class="[organizer.url ? 'tw-cursor-pointer hover:tw-shadow-lg' : '']"
              class="tw-mb-4 tw-flex tw-items-center tw-p-4 tw-gap-1 tw-bg-white tw-rounded-sm tw-shadow-md tw-w-[300px] tw-mr-6 tw-mb-6"
              @click="organizer.url ? openLink(organizer.url) : null"
            >
              <NuxtImg
                v-if="organizer.avatarUrl"
                :src="organizer.avatarUrl"
                class="tw-w-[120px] tw-h-[60px] tw-object-cover tw-mr-2"
              />
              <div class="tw-flex-1">
                <div class="tw-font-semibold tw-text-md">{{ organizer.title }}</div>
                <div class="tw-text-xl tw-font-bold tw-mt-1">{{ organizer.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-container>
  </v-main>
</template>

<style>
 .v-container {
    padding: 0 !important;
  }
</style>
