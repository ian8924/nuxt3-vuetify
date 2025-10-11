<script setup lang="ts">
import { getAlbumPicturesAPI } from '@/api/album/list.api'
import type { Media } from '@/types/interface/media.interface'
import { PhArrowLeft, PhArrowSquareOut, PhPlus, PhSelection, PhTrash } from '@phosphor-icons/vue'
import { useDebounceFn } from '@vueuse/core'
import { deleteMediaByIdAPI } from '~/api/media/info.api'

const albumStore = useAlbumStore()
const notifyStore = useNotifyStore()
const { ALBUM, ALBUM_PUBLIC_LINK_WEBSITE } = storeToRefs(albumStore)

const router = useRouter()
const isLoading = ref(false)
const isLoadingMore = ref(false)
const isLoadingDelete = ref(false)

const isShowConfirmDelete = ref(false)
const inputSearch = ref('')
const isShowFileUpload = ref(false)

const selectMode = ref(false)
const selectMediaIDs = ref<number[]>([])

const list: Ref<Media[]> = ref([])
const displayList = computed(() => list.value)

const totalMedias: Ref<number> = ref(0)
const currentPage = ref(1)
const totalPages: Ref<number> = ref(0)

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
  list.value = []
  currentPage.value = 1
  const request = { page: 0, size: 16, keyword: inputSearch.value }
  const { success, data } = await getAlbumPicturesAPI(ALBUM.value?.id, request)
  isLoading.value = false
  if (success) {
    totalMedias.value = data?.totalElements || 0
    totalPages.value = data?.totalPages || 0
    list.value = data?.content || []
  }
}

const fetchMorePictures = async () => {
  if (!ALBUM.value?.id)
    return
  if (totalPages.value === currentPage.value)
    return
  currentPage.value += 1
  isLoadingMore.value = true
  const request = { page: currentPage.value - 1, size: 16, keyword: inputSearch.value }
  const { success, data } = await getAlbumPicturesAPI(ALBUM.value?.id, request)
  isLoadingMore.value = false
  if (success) {
    totalMedias.value = data?.totalElements || 0
    totalPages.value = data?.totalPages || 0
    list.value = [...list.value, ...(data?.content || [])]
  }
}

const debouncedSearch = useDebounceFn(() => {
  fetchAlbumPictures()
}, 1000)

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

const openDeleteDialog = (ids: number[]) => {
  selectMediaIDs.value = ids
  isShowConfirmDelete.value = true
}

const selectMedia = (id: number) => {
  if (selectMediaIDs.value.includes(id)) {
    selectMediaIDs.value = selectMediaIDs.value.filter(item => item !== id)
  } else {
    selectMediaIDs.value.push(id)
  }
}

const deleteMedia = async (ids: number[] | null) => {
  if (ids?.length === 0)
    return

  const promiseList: any[] = []

  ids?.forEach((id) => {
    promiseList.push(deleteMediaByIdAPI(id))
  })

  isLoadingDelete.value = true
  await Promise.all(promiseList).then(() => {
    notifyStore.SHOW_NOTIFY({ message: '刪除成功', type: 'success' })
    fetchAlbumPictures()
  }).finally(() => {
    isLoadingDelete.value = false
    isShowConfirmDelete.value = false
    selectMediaIDs.value = []
  })
}

const openLink = () => {
  window.open(ALBUM_PUBLIC_LINK_WEBSITE.value, '_blank')
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
          <div class="tw-flex tw-items-center tw-cursor-pointer" @click="router.push('/admin/album')">
            <PhArrowLeft size="24" class="tw-mr-2" />
            <div class="tw-font-medium tw-text-base">
              {{ ALBUM?.name }}
            </div>
          </div>
        </template>
        <template #right>
          <div class="tw-font-medium tw-text-sm tw-text-gray-600">共 {{ totalMedias }} 張照片</div>
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
            @input="debouncedSearch()"
          />
        </template>
        <template #right>
          <div v-if="!selectMode" class="tw-flex tw-items-center tw-gap-3">
            <v-btn
              rounded
              color="transparent"
              class="tw-font-medium tw-text-sm"
              @click="selectMode = true"
            >
              批量處理
              <PhSelection size="16" class="tw-ml-1" />
            </v-btn>
            <v-divider class="tw-my-auto" vertical length="10px" />
            <v-btn
              rounded
              color="transparent"
              class="tw-font-medium tw-text-sm"
              @click="openLink"
            >
              查看網站
              <PhArrowSquareOut size="16" class="tw-ml-1" />
            </v-btn>
            <v-btn rounded @click="isShowFileUpload = true">
              匯入照片 <PhPlus size="16" class="tw-ml-1" />
            </v-btn>
          </div>
          <div v-else class="tw-flex tw-items-center tw-gap-3">
            <span class="tw-font-medium tw-text-sm tw-text-on-background">已選擇 {{ selectMediaIDs.length }} 張照片</span>
            <v-divider class="tw-my-auto" vertical length="10px" />
            <v-btn
              rounded
              class="tw-font-medium tw-text-sm"
              :disabled="selectMediaIDs.length === 0"
              @click="openDeleteDialog(selectMediaIDs)"
            >
              刪除
              <PhTrash size="16" class="tw-ml-1" />
            </v-btn>
            <v-divider class="tw-my-auto" vertical length="10px" />
            <v-btn
              rounded
              color="transparent"
              class="tw-font-medium tw-text-sm"
              @click="
                selectMode = false;
                selectMediaIDs = [];
              "
            >
              取消
            </v-btn>
          </div>
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
      <template v-else>
        <template v-if="list.length > 0">
          <v-row>
            <v-col
              v-for="item in displayList"
              :key="item.id"
              cols="12"
              sm="6"
              md="3"
            >
              <CardPic
                :item="item"
                :open-overlay="openOverlay"
                :open-delete-dialog="v => openDeleteDialog([v])"
                :select-mode="selectMode"
                :select-media-i-ds="selectMediaIDs"
                @toggle-select="selectMedia(item.id)"
              />
            </v-col>
          </v-row>
          <div v-if="currentPage < totalPages" class="tw-text-center tw-my-6">
            <v-btn
              :loading="isLoadingMore"
              rounded
              color="primary"
              @click="fetchMorePictures"
            >
              載入更多
            </v-btn>
          </div>
        </template>
        <template v-else>
          <NoDataDefault />
        </template>
      </template>
    </div>
  </v-main>
  <!-- 照片預覽 Overlay -->
  <OverlayPic
    v-if="currentMediaID && overlay"
    v-model="overlay"
    :media-i-d="currentMediaID"
    @click-next="toggleMedia('next')"
    @click-previous="toggleMedia('previous')"
  />
  <!-- 刪除確認視窗 -->
  <DialogConfirmDelete v-model="isShowConfirmDelete" :is-loading-delete="isLoadingDelete" @confirm="deleteMedia(selectMediaIDs)" />
  <!-- 新增照片視窗 -->
  <DialogUploadMedia
    v-if="ALBUM"
    v-model="isShowFileUpload"
    :album-id="ALBUM.id"
    @success="fetchAlbumPictures"
  />
</template>
