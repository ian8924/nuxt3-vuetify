<script setup lang="ts">
import { getUserAlbumsUnlinkedAPI } from '@/api/activity/linkAlbum.api'
import { getUserAlbumsAPI } from '@/api/album/list.api'
import type { Album } from '@/types/interface/album.interface'
import { PhArrowLeft, PhArrowSquareOut, PhFloppyDisk } from '@phosphor-icons/vue'
import dayjs from 'dayjs'

const router = useRouter()
const userStore = useUserStore()
const { USER } = storeToRefs(userStore)

const activityStore = useActivityStore()
const { ACTIVITY, ACTIVITY_PUBLIC_LINK_WEBSITE } = storeToRefs(activityStore)
const notifyStore = useNotifyStore()

const isLoading = ref(false)

const inputSearch = ref('')
const unlinkedAlbums: Ref<Album[]> = ref([])
const list: Ref<Album[]> = ref([])

// 已連結相簿數量
const totalAlbumsLinked = computed(() => list.value.length)

const fetchAlbumUnlinkedList = async () => {
  isLoading.value = true
  const request = { page: 0, size: 1000 }
  const { success, data } = await getUserAlbumsUnlinkedAPI(request)
  isLoading.value = false
  if (success) {
    unlinkedAlbums.value = data?.content || []
  }
}

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

const openLink = () => {
  window.open(ACTIVITY_PUBLIC_LINK_WEBSITE.value, '_blank')
}

onMounted(() => {
  fetchAlbumList()
  fetchAlbumUnlinkedList()
})

definePageMeta({
  layout: 'layout-activity',
  middleware: ['auth', 'activity']
})
</script>

<template>
  <v-main class="tw-flex tw-flex-col tw-min-h-[calc(100vh-70px)] tw-bg-[#fafafa]">
    <div class="tw-sticky tw-top-[70px] tw-bg-[#fafafa] tw-z-10 tw-shadow-sm">
      <TitleBlockDefault>
        <template #left>
          <div class="tw-flex tw-items-center tw-cursor-pointer" @click="router.push('/admin/activity')">
            <PhArrowLeft size="24" class="tw-mr-2" />
            <div class="tw-font-medium tw-text-base">
              連結相簿
            </div>
          </div>
        </template>
      </TitleBlockDefault>
      <TitleBlockDefault>
        <template #left>
          <div class="tw-flex tw-flex-col md:tw-flex-row">
            <div class="tw-flex tw-items-center tw-gap-6 tw-text-sm tw-text-gray-600">
              <div class="tw-flex tw-items-center tw-cursor-pointer tw-text-[#c0c0c0 tw-text-black]">
                已連結 {{ totalAlbumsLinked }} 個相簿
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
          <v-btn
            rounded
            color="transparent"
            class="tw-font-medium tw-text-sm tw-mr-3"
            @click="openLink"
          >
            查看網站
            <PhArrowSquareOut size="16" class="tw-ml-1" />
          </v-btn>
          <v-btn
            rounded
            :loading="isLoading"
            :disabled="isLoading"
            color="primary"
            class="tw-font-medium tw-text-sm"
          >
            儲存
            <PhFloppyDisk size="16" class="tw-ml-1" />
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
      <template v-if="list.length > 0">
        <v-row>
          <v-col
            v-for="item in list"
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
