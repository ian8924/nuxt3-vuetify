<script setup lang="ts">
import { getAlbumByIdAPI } from '@/api/album/info.api'
import { getAlbumPicturesAPI } from '@/api/album/list.api'
import type { Media } from '@/types/interface/media.interface'
import { PhCalendarDots, PhEyes, PhMapPinLine, PhShareNetwork } from '@phosphor-icons/vue'

const route = useRoute()
const albumID = Number(route.params.albumID)

const pictureData = ref<Media[]>([])
const totalMedias: Ref<number> = ref(0)
const currentPage = ref(1)
const totalPages: Ref<number> = ref(0)

const isLoadingMore = ref(false)
const showOverlay = ref(false)
const currentImageUrl = ref('')

const { data: albumData } = await getAlbumByIdAPI(albumID)

const getMedias = async () => {
  if (!albumID)
    return

  const { data: pictureResponse, success: successPicture } = await getAlbumPicturesAPI(albumID, {
    page: currentPage.value - 1,
    size: 12
  })
  if (successPicture && pictureResponse) {
    pictureData.value = pictureResponse.data.content
    totalMedias.value = pictureResponse.data.totalElements
    totalPages.value = pictureResponse.data.totalPages
  }
}

const fetchMorePictures = async () => {
  if (!albumID)
    return
  if (totalPages.value === currentPage.value)
    return
  currentPage.value += 1
  isLoadingMore.value = true
  const { data: pictureResponse, success: successPicture } = await getAlbumPicturesAPI(albumID, {
    page: currentPage.value - 1,
    size: 12
  })
  isLoadingMore.value = false
  if (successPicture && pictureResponse) {
    pictureData.value = pictureData.value.concat(pictureResponse.data.content)
    totalMedias.value = pictureResponse.data.totalElements
    totalPages.value = pictureResponse.data.totalPages
  }
}

const clickItem = (item: Media) => {
  // 點擊照片
  currentImageUrl.value = item.cdnUrl
  showOverlay.value = true
}

const clickPrevious = () => {
  // 點擊上一張
  if (!currentImageUrl.value)
    return
  const currentIndex = pictureData.value.findIndex(item => item.cdnUrl === currentImageUrl.value)
  if (currentIndex > 0) {
    currentImageUrl.value = pictureData.value[currentIndex - 1]?.cdnUrl || ''
  }
}

const clickNext = () => {
  // 點擊下一張
  if (!currentImageUrl.value)
    return
  const currentIndex = pictureData.value.findIndex(item => item.cdnUrl === currentImageUrl.value)
  if (currentIndex < pictureData.value.length - 1) {
    currentImageUrl.value = pictureData.value[currentIndex + 1]?.cdnUrl || ''
  }
}

onMounted(() => {
  getMedias()
})

definePageMeta({
  layout: 'layout-public',
  middleware: 'check-auth'
})
</script>

<template>
  <v-main>
    <div :style="{ backgroundImage: `url(${albumData?.coverPhotoUrl})`, filter: 'blur(10px)' } " class="tw-hidden sm:tw-block tw-absolute tw-bg-cover tw-bg-center tw-h-[600px] tw-w-full tw-mb-20" />
    <v-container class="tw-z-10 tw-relative tw-bg-white tw-p-[0px] tw-rounded-lg tw-shadow-lg tw-max-w-3xl tw-p-[0px]!">
      <!-- 相簿資訊 -->
      <div class="tw-flex-col sm:tw-flex-row tw-flex tw-gap-6 sm:tw-py-6">
        <div class="tw-w-full sm:tw-w-[40%] tw-rounded-lg tw-aspect-[4/3] tw-object-cover tw-relative">
          <nuxt-img
            v-if="albumData?.coverPhotoUrl"
            :src="albumData?.coverPhotoUrl"
            class="tw-w-full tw-h-full tw-rounded-lg tw-object-cover"
          />
          <div class="tw-absolute tw-bottom-[-1px] tw-right-3 tw-font-bold tw-flex tw-items-center tw-text-sm tw-text-white tw-mb-3">
            <PhCalendarDots size="14" class="tw-mr-2 tw-text-gray-600" />
            {{ albumData?.startedAt }} - {{ albumData?.endedAt }}
          </div>
          <div class="tw-absolute tw-bottom-[-1px] tw-left-3 tw-font-bold tw-flex tw-items-center tw-text-sm tw-text-white tw-mb-3">
            <PhMapPinLine size="14" class="tw-mr-2 tw-text-gray-600" />
            {{ albumData?.location }}
          </div>
        </div>

        <div class="tw-hidden sm:tw-flex tw-w-[60%] tw-flex-col tw-px-6 tw-py-10 tw-relative">
          <h1 class="tw-text-2xl tw-font-bold tw-text-[30px]/[1.2]">{{ albumData?.name }}</h1>
          <v-divider class="tw-mt-5 tw-mb-3"></v-divider>
          <div>
            <p class="tw-text-base tw-text-gray-600 tw-break-all">{{ albumData?.description }}</p>
          </div>
          <div class="tw-font-bold tw-flex tw-items-center tw-text-gray-600 tw-my-3 tw-text-base">
            <PhMapPinLine size="24" class="tw-mr-3 tw-text-gray-600" />
            {{ albumData?.location }}
          </div>
          <div class="tw-font-bold tw-flex tw-items-center tw-text-base tw-text-gray-600 tw-mb-3">
            <PhCalendarDots size="24" class="tw-mr-3 tw-text-gray-600" />
            {{ albumData?.startedAt }} - {{ albumData?.endedAt }}
          </div>

          <div class="tw-font-bold tw-flex tw-items-center tw-text-gray-600 tw-mt-3 tw-absolute tw-bottom-0">
            <PhEyes :size="24" />
            <span class="tw-font-bold tw-text-base tw-text-gray-600 tw-ml-2">觀看 0 次</span>
          </div>
        </div>
      </div>
      <div class="tw-hidden sm:tw-block tw-w-full tw-border-b tw-border-outline-variant tw-mt-4 tw-border-dashed "></div>
      <!-- 照片 -->
      <div class="tw-flex tw-justify-between tw-items-center tw-mt-0 sm:tw-mt-4">
        <div class="tw-px-6 tw-pt-6 tw-pb-3 tw-text-xl tw-font-bold tw-text-gray-700 tw-flex tw-items-center tw-gap-3">
          照片 <span class="tw-text-primary tw-text-base">{{ pictureData?.length }} 張</span>
        </div>
        <div>
          <v-btn color="white"> <PhShareNetwork size="16" class="tw-mr-1" />分享連結</v-btn>
        </div>
      </div>
      <div class="tw-my-2 sm:tw-my-5 tw-min-h-[80vh] tw-min-h-[200px]">
        <template v-if="pictureData.length > 0">
          <v-row>
            <v-col
              v-for="item in pictureData"
              :key="item.id"
              cols="4"
              md="3"
            >
              <v-card
                color="white"
                class="sm:tw-rounded-lg tw-cursor-pointer tw-aspect-[1/1] sm:tw-aspect-[4/3] tw-flex tw-items-center tw-justify-center"
                @click="clickItem(item)"
              >
                <nuxt-img
                  :src="item.cdnUrl"
                  fit="fill"
                  class="tw-h-full tw-mx-auto tw-absolute tw-inset-0"
                />
              </v-card>
            </v-col>
          </v-row>
          <div v-if="currentPage < totalPages" class="tw-text-center tw-py-8 sm:tw-py-6">
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
          <div class="tw-flex tw-justify-center tw-items-center tw-h-[40vh]">
            <NoDataDefault />
          </div>
        </template>
      </div>
    </v-container>
  </v-main>
  <overlay-pic-default
    v-model="showOverlay"
    :img-url="currentImageUrl"
    @click-previous="clickPrevious"
    @click-next="clickNext"
  />
</template>

<style>
@media (max-width: 640px) {
  .v-container {
    padding: 0 !important;
  }
  .v-col-md-3{
    padding:2px !important;
  }
}
</style>
