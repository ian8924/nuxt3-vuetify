<script setup lang="ts">
import { getAlbumPicturesAPI } from '@/api/album/list.api'
import type { Media } from '@/types/interface/media.interface'
import { PhArrowLeft, PhPlus } from '@phosphor-icons/vue'

const albumStore = useAlbumStore()
const { ALBUM } = storeToRefs(albumStore)

const router = useRouter()
const { formatFileSize } = useFileFormatter()
const isLoading = ref(false)

const inputSearch = ref('')
const list: Ref<Media[]> = ref([])
const displayList = computed(() => list.value.filter(item => item.fileName.includes(inputSearch.value)))

// Overlay 控制
const overlay = ref(false)
const openOverlay = (state: boolean) => {
  overlay.value = state
}

const fetchAlbumPictures = async () => {
  if (!ALBUM.value?.id)
    return
  isLoading.value = true
  const { success, data } = await getAlbumPicturesAPI(ALBUM.value?.id)
  isLoading.value = false
  if (success) {
    list.value = data?.content || []
  }
}

onMounted(() => {
  fetchAlbumPictures()
})

definePageMeta({
  layout: 'layout-album',
  middleware: ['auth', 'album']
})
</script>

<template>
  <v-main class="tw-flex tw-flex-col tw-min-h-[calc(100vh-70px)] tw-bg-[#fafafa] tw-relative ">
    <div class="tw-sticky tw-top-[70px] tw-bg-[#fafafa] tw-z-10 tw-shadow-sm">
      <TitleBlockDefault>
        <template #left>
          <div class="tw-flex tw-items-center tw-cursor-pointer" @click="router.push('/album')">
            <PhArrowLeft size="24" class="tw-mr-2" />
            <div class="tw-font-medium tw-text-base">
              {{ ALBUM?.name }}
            </div>
          </div>
        </template>
      </TitleBlockDefault>
      <TitleBlockDefault>
        <template #left>
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
        </template>
        <template #right>
          <v-btn rounded>
            匯入照片 <PhPlus size="16" class="tw-ml-1" />
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
            v-for="item in displayList"
            :key="item.id"
            cols="12"
            sm="6"
            md="3"
          >
            <v-card
              color="white"
              class="tw-p-6 tw-rounded-lg tw-mb-6 tw-min-h-[278px] tw-cursor-pointer hover:tw-shadow-lg"
              @click="openOverlay(true)"
            >
              <!-- 照片 -->
              <div
                class="tw-aspect-[4/3] tw-overflow-hidden tw-rounded tw-bg-surface tw-flex tw-items-center tw-justify-center tw-bg-center tw-bg-contain"
                :style="`background-image: url(${item.cdnUrl});`"
              />
              <!-- <div class="tw-aspect-[4/3] tw-overflow-hidden tw-rounded tw-bg-surface tw-flex tw-items-center tw-justify-center tw-bg-center tw-bg-contain">
                <NuxtImg
                  :src="item.cdnUrl"
                  fit="cover"
                  width="400"
                  height="300"
                />
              </div> -->
              <div class="tw-p-4">
                <v-tooltip :text="item.fileName" location="bottom">
                  <template #activator="{ props }">
                    <div
                      v-bind="props"
                      class="tw-font-medium tw-text-base tw-line-clamp-2 tw-break-words tw-h-[48px]"
                    >
                      {{ item.fileName }}
                    </div>
                  </template>
                </v-tooltip>
                <div class="tw-mt-2 tw-text-xs tw-text-on-surface-80">{{ formatFileSize(item.size) }}</div>
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
  <v-overlay v-model="overlay"></v-overlay>
</template>
