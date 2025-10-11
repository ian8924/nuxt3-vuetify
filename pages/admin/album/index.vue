<script setup lang="ts">
import { createAlbumAPI } from '@/api/album/info.api'
import { getUserAlbumsAPI } from '@/api/album/list.api'
import { PhImages, PhPlus } from '@phosphor-icons/vue'
import dayjs from 'dayjs'
import type { Album, ApiRequestCreateAlbum } from '~/types/interface/album.interface'

const router = useRouter()
const userStore = useUserStore()
const { USER } = storeToRefs(userStore)
const notifyStore = useNotifyStore()

const isLoading = ref(false)
const isLoadingCreate = ref(false)

const activeTab = ref('all')
const inputSearch = ref('')
const list: Ref<Album[]> = ref([])

// 計算各狀態相簿數量
const totalAlbums = computed(() => list.value.length)
const totalAlbumsActive = computed(() => list.value.filter(item => item.status === 1 || item.status === 0)?.length)
const totalAlbumsLocked = computed(() => list.value.filter(item => item.status === 2 || item.status === 3)?.length)

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
  const { success, data } = await getUserAlbumsAPI(USER.value?.id, request)
  isLoading.value = false
  if (success) {
    list.value = data?.content || []
  }
}

const createAlbum = async () => {
  const nowDate = dayjs().format('YYYY/MM/DD')
  const defaultData: ApiRequestCreateAlbum = {
    name: `${dayjs().format('YYYY/MM/DD HH:mm')} 樂見的相簿`,
    description: '',
    startedAt: nowDate,
    endedAt: nowDate,
    visibility: 1
  }
  isLoadingCreate.value = true
  const { success, data } = await createAlbumAPI(defaultData)
  isLoadingCreate.value = false
  if (success && data) {
    notifyStore.SHOW_NOTIFY({ message: '相簿創建成功', type: 'success' })
    router.push(`/admin/album/${data.id}/info`)
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
          <PhImages size="24" class="tw-mr-2" />
          <div class="tw-font-medium tw-text-base">
            相簿列表
          </div>
        </template>
        <template #right>
          <div class="tw-font-medium tw-text-sm tw-text-gray-600">共 {{ totalAlbums }} 個相簿</div>
        </template>
      </TitleBlockDefault>
      <TitleBlockDefault>
        <template #left>
          <div class="tw-flex tw-flex-col md:tw-flex-row">
            <div class="tw-flex tw-items-center tw-gap-6 tw-text-sm tw-text-gray-600">
              <div class="tw-flex tw-items-center tw-cursor-pointer tw-text-[#c0c0c0]" :class="{ 'tw-text-black': activeTab === 'all' }" @click="activeTab = 'all'">
                全部 {{ totalAlbums }}
              </div>
              <v-divider class="tw-my-auto" vertical length="10px" />
              <div class="tw-flex tw-items-center tw-cursor-pointer tw-text-[#c0c0c0]" :class="{ 'tw-text-black': activeTab === 'in-use' }" @click="activeTab = 'in-use'">
                使用中 {{ totalAlbumsActive }}
              </div>
              <v-divider class="tw-my-auto" vertical length="10px" />
              <div class="tw-flex tw-items-center tw-cursor-pointer tw-text-[#c0c0c0]" :class="{ 'tw-text-black': activeTab === 'locked' }" @click="activeTab = 'locked'">
                已鎖定 {{ totalAlbumsLocked }}
              </div>
              <v-divider class="tw-my-auto" vertical length="10px" />
            </div>
            <div class="tw-ml-5 tw-mt-4 md:tw-mt-0">
              <v-text-field
                v-model="inputSearch"
                hide-details
                density="comfortable"
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
          <v-btn :loading="isLoadingCreate" rounded @click="createAlbum">
            新建相簿 <PhPlus size="16" class="tw-ml-1" />
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
              :to="`/admin/album/${item.id}/pictures`"
            >
              <!-- <div
                class="tw-aspect-[2/1] tw-overflow-hidden tw-rounded tw-bg-center tw-bg-contain"
                :style="`background-image: url(${item.coverPhotoUrl});`"
              /> -->
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
                <div class="tw-mt-2 tw-text-sm tw-text-on-surface tw-line-clamp-1 tw-break-words tw-h-[24px]">{{ item.description }}</div>
                <div class="tw-mt-1 tw-text-sm tw-text-on-surface-80 tw-truncate">{{ dayjs(item.startedAt).format('YYYY/MM/DD') }} - {{ dayjs(item.endedAt).format('YYYY/MM/DD') }}</div>
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
