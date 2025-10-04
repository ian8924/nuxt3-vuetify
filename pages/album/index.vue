<script setup lang="ts">
import NoDataDefault from '@/components/noData/NoDataDefault.vue'
import { PhImages, PhPlus } from '@phosphor-icons/vue'

import { getUserAlbumsAPI } from '@/api/album/list.api'
import type { Album } from '@/types/interface/album/albumList.interface'

const userStore = useUserStore()
const { USER } = storeToRefs(userStore)

const isLoading = ref(false)
const { formatDate } = useFormatTime()

const activeTab = ref('all')
const inputSearch = ref('')
const list: Ref<Album[]> = ref([])

const totalAlbums = computed(() => list.value.length)
const displayAlbums = computed(() => {
  return list.value.filter(item => item.name.includes(inputSearch.value))
})

const fetchAlbumList = async () => {
  if (!USER.value?.id)
    return
  isLoading.value = true
  const { success, data } = await getUserAlbumsAPI(USER.value?.id)
  isLoading.value = false
  if (success) {
    list.value = data?.content.reverse() || []
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
              全部 {{ totalAlbums }}
            </div>
            <v-divider class="tw-my-auto" vertical length="10px" />
            <div class="tw-flex tw-items-center tw-cursor-pointer tw-text-[#c0c0c0]" :class="{ 'tw-text-black': activeTab === 'in-use' }" @click="activeTab = 'in-use'">
              使用中
            </div>
            <v-divider class="tw-my-auto" vertical length="10px" />
            <div class="tw-flex tw-items-center tw-cursor-pointer tw-text-[#c0c0c0]" :class="{ 'tw-text-black': activeTab === 'locked' }" @click="activeTab = 'locked'">
              已鎖定
            </div>
            <v-divider class="tw-my-auto" vertical length="10px" />
          </div>
          <div class="tww-ml-5 tw-mt-4 md:tw-mt-0">
            <v-text-field
              v-model="inputSearch"
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
      <template v-if="isLoading">
        <v-row>
          <v-col
            v-for="n in 8"
            :key="n"
            cols="12"
            sm="6"
            md="3"
          >
            <v-skeleton-loader
              class="mx-auto border"
              type="image, article"
            />
          </v-col>
        </v-row>
      </template>
      <template v-if="list.length > 0">
        <v-row>
          <v-col
            v-for="item in displayAlbums"
            :key="item.id"
            cols="12"
            sm="6"
            md="3"
          >
            <v-card
              color="white"
              class="tw-p-6 tw-rounded-lg tw-mb-6 tw-min-h-[278px] tw-cursor-pointer hover:tw-shadow-lg"
              :to="`/album/${item.id}/picture`"
            >
              <div class="tw-aspect-[2/1] tw-overflow-hidden tw-rounded">
                <NuxtImg class="tw-w-full tw-h-full tw-object-cover" :src="item.coverPhotoUrl" />
              </div>
              <div class="tw-p-4">
                <div class="tw-font-medium tw-text-xl">{{ item.name }}</div>
                <div class="tw-mt-2 tw-text-sm tw-text-on-surface">{{ item.description }}</div>
                <div class="tw-mt-1 tw-text-sm tw-text-on-surface-80">{{ formatDate(item.startedAt) }} - {{ formatDate(item.endedAt) }}</div>
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
