<!-- eslint-disable ts/no-use-before-define -->
<script setup lang="ts">
import { getActivityPublicByIdAPI } from '@/api/public/activity.api'
import { VisibilityEnum } from '@/types/enum/visibility.enum'
import type { Activity } from '@/types/interface/activity.interface'
import { PhCalendarDots, PhCaretDown, PhCube, PhMapPinLine } from '@phosphor-icons/vue'
import dayjs from 'dayjs'
import { getAlbumLinkByActivityId } from '~/api/activity/linkAlbum.api'
import { getEventVisibilityAPI } from '~/api/public/activity.api'
import type { Album } from '~/types/interface/album.interface'

const route = useRoute()
const eventID = route.params.eventID as string

const userStore = useUserStore()
const notifyStore = useNotifyStore()

const { IS_LOGIN } = storeToRefs(userStore)

const activityInfo: Ref<Activity | null> = ref(null)
const albumLinks: Ref<Album[]> = ref([])
const showMoreDescription = ref(false)

const inputVisiblePassword = ref<string | null>(null)
const activityVisibility = ref<VisibilityEnum | null>(null)
const showPasswordDialog = ref(false)

// 取得活動可見性
const { data: eventVisibilityData, success } = await getEventVisibilityAPI(eventID)

// 確認可見性
const checkVisibility = () => {
  // 已登入使用者，視為公開相簿
  if (IS_LOGIN.value) {
    activityVisibility.value = VisibilityEnum.Public
    verifyPassword()
    return
  }

  // 未登入使用者，設為隱私
  if (!success) {
    activityVisibility.value = VisibilityEnum.Private
  }

  // 需要密碼保護
  if (eventVisibilityData?.data?.visibility === VisibilityEnum.Shared) {
    activityVisibility.value = VisibilityEnum.Shared
    showPasswordDialog.value = true
  }

  // 公開相簿
  if (eventVisibilityData?.data?.visibility === VisibilityEnum.Public) {
    activityVisibility.value = VisibilityEnum.Public
    verifyPassword()
  }
}

// 驗證密碼
const verifyPassword = async (password: string = '') => {
  inputVisiblePassword.value = password
  if (!eventID)
    return

  // 驗證密碼
  const { data: activityDataRes, success: verifySuccess } = await getActivityPublicByIdAPI(eventID, password)

  if (verifySuccess) {
    // 密碼正確，顯示相簿內容
    activityVisibility.value = VisibilityEnum.Shared
    showPasswordDialog.value = false
    activityInfo.value = activityDataRes?.data || null
    getAlbumList()
  } else {
    // 密碼錯誤，顯示錯誤訊息
    notifyStore.SHOW_NOTIFY({ message: '密碼錯誤，請重新輸入', type: 'error' })
  }
}

const getAlbumList = async () => {
  if (!activityInfo.value?.id)
    return
  const { data, success } = await getAlbumLinkByActivityId(activityInfo.value?.id, { page: 0, size: 1000, sharedPassword: inputVisiblePassword.value })
  if (success) {
    albumLinks.value = data?.content || []
  }
}

const albumLinksFiltered = computed(() => {
  return albumLinks.value.filter(i => i.visibility !== VisibilityEnum.Private)
})

const guests = computed(() => {
  return activityInfo.value?.participants.filter(participant => participant.type === 'guest').reverse() || []
})

const organizers = computed(() => {
  return activityInfo.value?.participants.filter(participant => participant.type === 'org').reverse() || []
})

const openLink = (url: string) => {
  window.open(url, '_blank')
}

onMounted(() => {
  checkVisibility()
})

definePageMeta({
  layout: 'layout-public',
  middleware: 'check-auth'
})
</script>

<template>
  <div
    v-if="activityVisibility === VisibilityEnum.Private"
    class="tw-w-full tw-h-[100vh] tw-flex tw-justify-center tw-items-center tw-text-2xl tw-font-bold"
  >
    找不到此頁面
  </div>
  <v-main v-else class="tw-bg-background">
    <div :style="{ backgroundImage: `url(${activityInfo?.coverPhotoUrl})`, filter: 'blur(10px)' } " class="tw-hidden sm:tw-block tw-absolute tw-bg-cover tw-bg-center tw-h-[600px] tw-w-full tw-mb-20" />
    <v-container class="tw-z-10 tw-relative tw-bg-white tw-rounded-lg  tw-max-w-3xl tw-p-[0px]!">
      <div class="tw-w-full tw-shadow-lg tw-p-3 sm:tw-p-0 tw-relative">
        <!-- 相簿資訊 -->
        <div class="tw-flex-col sm:tw-flex-row tw-flex tw-gap-6 sm:tw-py-6">
          <div class="tw-w-full tw-aspect-[4/3] tw-object-cover tw-relative">
            <nuxt-img
              v-if="activityInfo?.coverPhotoUrl"
              :src="activityInfo?.coverPhotoUrl"
              class="tw-w-full tw-h-full tw-rounded-lg tw-object-cover"
            />
          </div>
        </div>
        <div class="tw-py-3 sm:tw-py-4 sm:tw-px-6">
          <!-- 標頭 -->
          <div class="tw-full tw-flex tw-justify-between tw-items-center tw-mb-4">
            <h1 class="tw-text-2xl sm:tw-text-3xl tw-font-bold">{{ activityInfo?.name }}</h1>
            <div class="tw-absolute sm:tw-relative tw-top-2 tw-right-1 tw-flex tw-items-center tw-gap-2 tw-text-lg sm:tw-text-xl tw-font-medium tw-px-6 tw-py-2">
              <NuxtImg v-if="activityInfo?.theme" class="tw-w-6 tw-h-6" :src="activityInfo?.theme.iconUrl" />
              {{ activityInfo?.theme?.name }}
            </div>
          </div>
          <!-- 地點 -->
          <div v-if="activityInfo?.location" class="tw-flex tw-items-center tw-my-4 tw-mt-2 sm:tw-mt-8 tw-gap-1">
            <PhMapPinLine size="22" class="tw-mr-1 sm:tw-mr-2 tw-text-gray-600" />
            {{ activityInfo?.location }}
          </div>
          <!-- 日期時間 -->
          <div class="tw-flex tw-items-center tw-mb-4 tw-gap-6 tw-font-medium">
            <div v-if="activityInfo?.startedAt && activityInfo?.endedAt" class="tw-flex tw-items-center tw-gap-1 sm:tw-gap-2">
              <PhCalendarDots size="22" class="tw-text-gray-600" />
              {{ dayjs(activityInfo?.startedAt).format('YYYY/MM/DD') }} - {{ dayjs(activityInfo?.endedAt).format('YYYY/MM/DD') }}
            </div>
            <div v-if="activityInfo?.activityTime" class="tw-flex tw-items-center tw-gap-1 sm:tw-gap-2">
              <PhCalendarDots size="22" class="tw-text-gray-600" />
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

          <div class="tw-py-5 sm:tw-py-10">
            <!-- 活動簡介 -->
            <div v-if="activityInfo?.description" id="activity-intro">
              <div class="tw-flex tw-items-center tw-text-xl tw-font-bold tw-gap-2">
                <PhCube size="24px" />  活動簡介
              </div>
              <div class="tw-my-3 " :class="[showMoreDescription ? 'tw-line-clamp-none' : 'tw-line-clamp-3']" v-html="activityInfo?.description?.replaceAll('\n', '<br/>')">
              </div>
              <div class="tw-text-sm cursor-pointer tw-justify-center tw-items-center tw-mx-auto tw-flex tw-gap-2" @click="showMoreDescription = !showMoreDescription">
                <span>{{ showMoreDescription ? '收起' : '展開更多' }}</span>
                <PhCaretDown size="14px" class="tw-transition-transform" :class="{ 'tw-rotate-180': showMoreDescription }" />
              </div>
            </div>
            <!-- 精選照片 -->
            <div v-if="false" class="tw-py-10">
              <div class="tw-flex tw-items-center tw-text-xl tw-font-bold tw-gap-2">
                <PhCube size="24px" />  精選照片
              </div>
              <div class="tw-my-3" v-html="activityInfo?.description">
              </div>
            </div>
            <!-- 活動相簿 -->
            <div v-if="albumLinksFiltered.length > 0" id="activity-album" class="tw-pt-5 sm:tw-pt-10">
              <div class="tw-flex tw-items-center tw-text-xl tw-font-bold tw-gap-2 tw-mb-5">
                <PhCube size="24px" />  活動相簿
              </div>
              <div class="tw-flex tw-overflow-scroll tw-gap-6">
                <div
                  v-for="album in albumLinksFiltered"
                  :key="album.id"
                  class="tw-rounded-lg hover:tw-shadow-lg tw-mb-3 tw-bg-white tw-shadow-md tw-max-w-[250px] tw-min-w-[250px] tw-cursor-pointer"
                  @click="$router.push(`/public/album/${album.folderId}`)"
                >
                  <div
                    class="tw-w-full tw-h-[180px] tw-flex tw-items-center tw-justify-center "
                  >
                    <NuxtImg
                      :src="album.coverPhotoUrl ? album.coverPhotoUrl : '/images/web/no-data.png'"
                      class="tw-h-full tw-object-cover tw-mb-3"
                    />
                  </div>
                  <div class="tw-text-lg tw-font-bold tw-p-3 tw-line-clamp-2">{{ album.name }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="guests.length" id="activity-guests" class="tw-flex tw-flex-col tw-items-center tw-w-full tw-justify-center tw-mt-5 sm:tw-mt-10">
        <div class="tw-w-full  tw-py-10 tw-px-6 tw-flex tw-flex-col tw-items-center tw-border-b tw-border-outline-variant tw-border-dashed">
          <div class="tw-mx-auto tw-font-bold tw-mb-8">
            活動來賓
          </div>
          <div class="tw-flex tw-gap-5 tw-flex-wrap tw-justify-center">
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
      </div>
      <div v-if="organizers.length" id="activity-organizers" class="tw-w-full tw-py-10 tw-flex tw-flex-col tw-justify-center tw-px-6">
        <div class="tw-mx-auto tw-font-bold tw-mb-8">活動單位</div>
        <div class="tw-flex tw-flex-wrap tw-flex tw-justify-center">
          <div
            v-for="organizer in organizers"
            :key="organizer.id"
            :class="[organizer.url ? 'tw-cursor-pointer hover:tw-shadow-lg' : '']"
            class="tw-flex tw-items-center tw-p-4 tw-gap-1 tw-bg-white tw-rounded-sm tw-shadow-md tw-w-[300px] sm:tw-mr-6 tw-mb-6"
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
    </v-container>
  </v-main>
  <DialogInputSharedPassword
    v-model="showPasswordDialog"
    @confirm="verifyPassword"
  />
</template>

<style>
 .v-container {
    padding: 0 !important;
  }
</style>
