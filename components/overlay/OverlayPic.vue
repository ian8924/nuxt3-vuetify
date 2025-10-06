<script lang="ts" setup>
import { getMediaByIdAPI } from '@/api/media/info.api'
import type { Media, MediaMetadata } from '@/types/interface/media.interface'
import { PhCalendarDots, PhCamera, PhCaretLeft, PhCaretRight, PhCube, PhImage, PhMapPinLine, PhX } from '@phosphor-icons/vue'
import dayjs from 'dayjs'

const props = defineProps({
  mediaID: {
    type: Number,
    default: 0
  }
})

const emits = defineEmits(['clickPrevious', 'clickNext', 'update:modelValue'])

const { getImageMetadata } = useImgMeta()

const showOverlay = defineModel('modelValue', {
  type: Boolean,
  default: false
})

const currentMedia = ref<Media | null>(null)
const metaData = ref<MediaMetadata | null>(null)
const loading = ref(false)

const getImageData = async () => {
  if (!props.mediaID)
    return
  loading.value = true
  const { data, success } = await getMediaByIdAPI(props.mediaID)
  loading.value = false
  if (success && data) {
    currentMedia.value = data.data
    metaData.value = await getImageMetadata(data.data)
  }
}

watch(() => props.mediaID, async (newVal, oldVal) => {
  if (newVal !== oldVal) {
    await getImageData()
  }
})

onMounted(() => {
  getImageData()
})
</script>

<template>
  <v-overlay
    v-model="showOverlay"
    opacity="0.8"
    :z-index="2000"
  >
    <div class="tw-grid tw-grid-cols-12 tw-w-[100vw] tw-h-[100vh]">
      <div class="tw-col-span-9 tw-h-[100vh] tw-flex tw-justify-center tw-relative">
        <div
          v-if="currentMedia"
          class="col-span-4  tw-h-hull tw-aspect-[4/3] tw-rounded tw-bg-center tw-bg-contain"
          :style="`background-image: url(${currentMedia.cdnUrl});`"
          loading="lazy"
        />
        <div class="tw-absolute tw-top-[calc(50%-12px)] tw-right-4">
          <v-icon-btn color="transparent" @click="emits('clickNext')">
            <PhCaretRight
              class="hover:tw-text-black tw-text-white"
              weight="bold"
              :size="24"
            />
          </v-icon-btn>
        </div>
        <div class="tw-absolute tw-top-[calc(50%-12px)] tw-left-4">
          <v-icon-btn color="transparent" @click="emits('clickPrevious')">
            <PhCaretLeft
              class="hover:tw-text-black tw-text-white"
              weight="bold"
              :size="24"
            />
          </v-icon-btn>
        </div>
      </div>
      <div class="tw-col-span-3 tw-bg-white tw-h-[100vh] tw-py-10 tw-px-6 tw-relative tw-shadow-lg">
        <div class="tw-absolute tw-top-4 tw-right-4">
          <v-icon-btn color="white" @click="showOverlay = false">
            <PhX weight="bold" :size="24" />
          </v-icon-btn>
        </div>

        <div class="tw-text-black tw-font-medium tw-text-base">
          照片資訊
          <div class="tw-mt-6 tw-flex tw-flex-col tw-gap-6">
            <!-- row 1 -->
            <div class="tw-flex">
              <div class="tw-mr-4">
                <PhImage weight="bold" :size="24" />
              </div>
              <div>
                <div class="tw-text-primary tw-text-base tw-text-wrap tw-w-[250px] tw-break-words">{{ currentMedia?.fileName }}</div>
                <div class="tw-text-on-surface-80 tw-text-sm tw-mt-1">
                  {{ metaData?.mp || "" }}・{{ metaData?.resolution || "" }}・
                  {{ metaData?.mode || "" }}
                </div>
              </div>
            </div>
            <!-- row 2 -->
            <div class="tw-flex">
              <div class="tw-mr-4">
                <PhCamera weight="bold" :size="24" />
              </div>
              <div>
                <div class="tw-text-primary tw-text-base tw-text-wrap tw-w-[250px] tw-break-words">{{ metaData?.device }}</div>
                <div class="tw-text-on-surface-80 tw-text-sm tw-mt-1">
                  {{ metaData?.focalLength || "" }}・{{ metaData?.aperture || "" }}・
                  {{ metaData?.shutterSpeed || "" }}・{{ metaData?.iso || "" }}
                </div>
              </div>
            </div>
            <!-- row 3 -->
            <div class="tw-flex">
              <div class="tw-mr-4">
                <PhCalendarDots weight="bold" :size="24" />
              </div>
              <div v-if="currentMedia?.createdAt">
                <div class="tw-text-primary tw-text-base tw-text-wrap tw-w-[250px] tw-break-words">{{ dayjs(currentMedia?.createdAt).format('YYYY/MM/DD') }}</div>
                <div class="tw-text-on-surface-80 tw-text-sm tw-mt-1">
                  {{ dayjs(currentMedia?.createdAt).format('dddd A hh:mm') }} GMT+08:00
                </div>
              </div>
            </div>

            <!-- row 4 -->
            <div class="tw-flex">
              <div class="tw-mr-4">
                <PhMapPinLine weight="bold" :size="24" />
              </div>
              <div v-if="metaData?.location">
                <div class="tw-text-primary tw-text-base tw-text-wrap tw-w-[250px] tw-break-words">{{ metaData?.location || "" }}</div>
              </div>
            </div>

            <!-- row 5 -->
            <div class="tw-flex">
              <div class="tw-mr-4">
                <PhCube weight="bold" :size="24" />
              </div>
              <div v-if="metaData?.size">
                <div class="tw-text-primary tw-text-base tw-text-wrap tw-w-[250px] tw-break-words">檔案大小 {{ metaData.size }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-overlay>
</template>
