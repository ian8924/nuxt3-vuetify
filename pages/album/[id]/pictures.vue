<script setup lang="ts">
import { getAlbumPicturesAPI } from '@/api/album/list.api'
import type { Media } from '@/types/interface/media.interface'
import { PhArrowLeft, PhPlus } from '@phosphor-icons/vue'
import { deleteMediaByIdAPI } from '~/api/media/info.api'

const albumStore = useAlbumStore()
const notifyStore = useNotifyStore()
const { ALBUM } = storeToRefs(albumStore)

const router = useRouter()
const isLoading = ref(false)
const isLoadingDelete = ref(false)
const isShowConfirmDelete = ref(false)
const deleteMediaID = ref<number | null>(null)
const inputSearch = ref('')

const list: Ref<Media[]> = ref([])
const displayList = computed(() => list.value.filter(item => item.fileName.includes(inputSearch.value)))

// Overlay 控制
const currentMediaID = ref<number | null>(null)
const overlay = ref(false)
const openOverlay = (state: boolean, mediaID: number) => {
  currentMediaID.value = mediaID
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

const toggleMedia = (direction: 'next' | 'previous') => {
  if (!currentMediaID.value && displayList.value.length === 0)
    return
  const currentIndex = displayList.value.findIndex(item => item.id === currentMediaID.value)
  if (direction === 'next') {
    const nextIndex = (currentIndex + 1) % displayList.value.length
    if (displayList.value[nextIndex]) {
      currentMediaID.value = displayList.value[nextIndex].id
    }
  } else if (direction === 'previous') {
    const previousIndex = (currentIndex - 1 + displayList.value.length) % displayList.value.length
    if (displayList.value[previousIndex]) {
      currentMediaID.value = displayList.value[previousIndex].id
    }
  }
}

const openDeleteDialog = (id: number) => {
  isShowConfirmDelete.value = true
  deleteMediaID.value = id
}

const deleteMedia = async (id: number | null) => {
  if (id === null)
    return
  isLoadingDelete.value = true
  const { success } = await deleteMediaByIdAPI(id)
  isLoadingDelete.value = false
  if (success) {
    notifyStore.SHOW_NOTIFY({ message: '刪除成功', type: 'success' })
    await fetchAlbumPictures()
    isShowConfirmDelete.value = false
    deleteMediaID.value = null
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
            <CardPic :item="item" :open-overlay="openOverlay" :open-delete-dialog="openDeleteDialog" />
          </v-col>
        </v-row>
      </template>
      <template v-else>
        <NoDataDefault />
      </template>
    </div>
  </v-main>
  <OverlayPic
    v-if="currentMediaID && overlay"
    v-model="overlay"
    :media-i-d="currentMediaID"
    @click-next="toggleMedia('next')"
    @click-previous="toggleMedia('previous')"
  />
  <DialogConfirmDelete v-model="isShowConfirmDelete" :is-loading-delete="isLoadingDelete" @confirm="deleteMedia(deleteMediaID)" />
</template>
