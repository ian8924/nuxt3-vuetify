<script lang="ts" setup>
import { getMediaByIdAPI } from '@/api/album/info.api'
import type { Media } from '@/types/interface/media.interface'
import { PhImage, PhX } from '@phosphor-icons/vue'

const props = defineProps({
  mediaID: {
    type: Number,
    default: 0
  }
})

const showOverlay = defineModel('modelValue', {
  type: Boolean,
  default: false
})

const currentMedia = ref<Media | null>(null)
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  const { data, success } = await getMediaByIdAPI(props.mediaID)
  loading.value = false
  if (success && data) {
    currentMedia.value = data.data
  }
})
</script>

<template>
  <v-overlay
    v-model="showOverlay"
    opacity="0.8"
    :z-index="2000"
  >
    <div class="tw-grid tw-grid-cols-12 tw-w-[100vw] tw-h-[100vh]">
      <div class="tw-col-span-9 tw-h-[100vh] tw-flex tw-justify-center">
        <div
          v-if="currentMedia"
          class="col-span-4  tw-h-hull tw-aspect-[4/3] tw-rounded tw-bg-center tw-bg-contain"
          :style="`background-image: url(${currentMedia.cdnUrl});`"
          loading="lazy"
        />
        <!-- <NuxtImg
          v-if="currentMedia"
          class="tw-object-cover"
          :src="currentMedia.cdnUrl"
          height="100%"
          fill="contain"
          loading="lazy"
        /> -->
        <!-- {{ props.mediaID }} -->
      </div>
      <div class="tw-col-span-3 tw-bg-white tw-h-[100vh] tw-py-10 tw-px-6 tw-relative tw-shadow-lg">
        <div class="tw-absolute tw-top-4 tw-right-4">
          <v-icon-btn color="white" @click="showOverlay = false">
            <PhX weight="bold" :size="24" />
          </v-icon-btn>
        </div>

        <div class="tw-text-black tw-font-medium tw-text-base">
          照片資訊
          <div class="tw-mt-6 ">
            <div class="tw-flex">
              <div class="tw-mr-2">
                <PhImage weight="bold" :size="24" />
              </div>
              <div>
                <div class="tw-text-primary tw-text-base tw-text-wrap">{{ currentMedia?.fileName }}</div>
                <div class="tw-text-on-surface-80 tw-text-sm tw-mt-2">{{ currentMedia?.description }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-overlay>
</template>
