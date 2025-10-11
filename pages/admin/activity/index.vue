<script setup lang="ts">
import { createActivityAPI } from '@/api/activity/info.api'
import { getUserActivityListAPI } from '@/api/activity/list.api'
import type { Activity, ApiRequestCreateActivity } from '@/types/interface/activity.interface'
import { PhPlus, PhTicket } from '@phosphor-icons/vue'
import dayjs from 'dayjs'

const router = useRouter()
const userStore = useUserStore()
const { USER } = storeToRefs(userStore)
const notifyStore = useNotifyStore()

const isLoading = ref(false)
const isLoadingCreate = ref(false)

const activeTab = ref('all')
const inputSearch = ref('')
const list: Ref<Activity[]> = ref([])

// 計算各狀態活動數量
const totalActivities = computed(() => list.value.length)
const totalActivitiesActive = computed(() => list.value.filter(item => item.status === 1 || item.status === 0)?.length)
const totalActivitiesLocked = computed(() => list.value.filter(item => item.status === 2 || item.status === 3)?.length)

// 根據搜尋和篩選條件顯示相簿
const displayAlbums = computed(() => {
  return list.value.filter(item => item.name.includes(inputSearch.value)).filter((item) => {
    if (activeTab.value === 'all')
      return true
    if (activeTab.value === 'in-use')
      return item.status === 1 || item.status === 0
    if (activeTab.value === 'locked')
      return item.status === 2 || item.status === 3
    return true
  })
})

const fetchAlbumList = async () => {
  if (!USER.value?.id)
    return
  isLoading.value = true
  const request = { page: 0, size: 1000 }
  const { success, data } = await getUserActivityListAPI(request)
  isLoading.value = false
  if (success) {
    list.value = data?.data.content || []
  }
}

const createAlbum = async () => {
  const nowDate = dayjs()
  const defaultData: ApiRequestCreateActivity = {
    name: `${nowDate.format('YYYY/MM/DD HH:mm')} 樂見的活動`,
    organizer: '',
    startedAt: nowDate,
    endedAt: nowDate,
    visibility: 0,
    description: ''
  }
  isLoadingCreate.value = true
  const { success, data } = await createActivityAPI(defaultData)
  isLoadingCreate.value = false
  if (success && data?.data) {
    notifyStore.SHOW_NOTIFY({ message: '活動創建成功', type: 'success' })
    router.push(`/admin/activity/${data.data.eventId}/info`)
  }
}

onMounted(() => {
  fetchAlbumList()
})

definePageMeta({
  middleware: 'auth'
})
</script>

<template>
  <v-main class="tw-flex tw-flex-col tw-min-h-[calc(100vh-70px)] tw-bg-[#fafafa]">
    <div class="tw-sticky tw-top-[70px] tw-bg-[#fafafa] tw-z-10 tw-shadow-sm">
      <TitleBlockDefault>
        <template #left>
          <PhTicket size="24" class="tw-mr-2" />
          <div class="tw-font-medium tw-text-base">
            活動管理
          </div>
        </template>
        <template #right>
          <div class="tw-font-medium tw-text-sm tw-text-gray-600">共 {{ totalActivities }} 個活動</div>
        </template>
      </TitleBlockDefault>
      <TitleBlockDefault>
        <template #left>
          <div class="tw-flex tw-flex-col md:tw-flex-row">
            <div class="tw-flex tw-items-center tw-gap-6 tw-text-sm tw-text-gray-600">
              <div class="tw-flex tw-items-center tw-cursor-pointer tw-text-[#c0c0c0]" :class="{ 'tw-text-black': activeTab === 'all' }" @click="activeTab = 'all'">
                全部 {{ totalActivities }}
              </div>
              <v-divider class="tw-my-auto" vertical length="10px" />
              <div class="tw-flex tw-items-center tw-cursor-pointer tw-text-[#c0c0c0]" :class="{ 'tw-text-black': activeTab === 'in-use' }" @click="activeTab = 'in-use'">
                公開 {{ totalActivitiesActive }}
              </div>
              <v-divider class="tw-my-auto" vertical length="10px" />
              <div class="tw-flex tw-items-center tw-cursor-pointer tw-text-[#c0c0c0]" :class="{ 'tw-text-black': activeTab === 'locked' }" @click="activeTab = 'locked'">
                未公開 {{ totalActivitiesLocked }}
              </div>
              <div class="tw-flex tw-items-center tw-cursor-pointer tw-text-[#c0c0c0]" :class="{ 'tw-text-black': activeTab === 'locked' }" @click="activeTab = 'locked'">
                隱私 {{ totalActivitiesLocked }}
              </div>
              <v-divider class="tw-my-auto" vertical length="10px" />
            </div>
            <div class="tw-ml-5 tw-mt-4 md:tw-mt-0">
              <v-text-field
                v-model="inputSearch"
                hide-details
                bg-color="white"
                density="comfortable"
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
          <v-btn :loading="isLoadingCreate" rounded @click="createAlbum">
            新建活動 <PhPlus size="16" class="tw-ml-1" />
          </v-btn>
        </template>
      </TitleBlockDefault>
    </div>
    <div class="tw-px-[40px] tw-py-[18px] tw-w-full tw-flex-1">
      <template v-if="isLoading">
        <v-row>
          <v-col
            v-for="n in 8"
            :key="n"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-skeleton-loader
              class="mx-auto border"
              type="image, article"
            />
          </v-col>
        </v-row>
      </template>
      <template v-if="displayAlbums.length > 0">
        <v-row>
          <v-col
            v-for="item in displayAlbums"
            :key="item.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card
              color="white"
              class="tw-p-6 tw-rounded-lg tw-mb-6 tw-min-h-[240px] tw-cursor-pointer hover:tw-shadow-lg"
              :to="`/admin/activity/${item.eventId}/info`"
            >
              <div class="tw-aspect-[2/1] tw-overflow-hidden tw-rounded tw-bg-surface tw-flex tw-items-center tw-justify-center">
                <NuxtImg
                  class="tw-object-cover tw-h-full"
                  :src="item.coverPhotoUrl"
                  fit="contain"
                  loading="lazy"
                />
              </div>

              <div class="tw-p-4">
                <v-tooltip :text="item.name" location="bottom">
                  <template #activator="{ props }">
                    <div
                      v-bind="props"
                      class="tw-font-medium tw-text-base tw-truncate"
                    >
                      {{ item.name }}
                    </div>
                  </template>
                </v-tooltip>
                <div class="tw-mt-2 tw-text-sm tw-text-on-surface tw-line-clamp-1 tw-break-words tw-h-[24px]">
                  {{ item.description }}
                </div>
                <div class="tw-mt-1 tw-text-sm tw-text-on-surface-80 tw-truncate">
                  {{ dayjs(item.startedAt).format('YYYY/MM/DD') }} - {{ dayjs(item.endedAt).format('YYYY/MM/DD') }}
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </template>
      <template v-else>
        <NoDataDefault />
      </template>
    </div>
  </v-main>
</template>
