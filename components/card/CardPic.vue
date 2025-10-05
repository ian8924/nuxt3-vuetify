<script setup lang="ts">
import type { Media } from '@/types/interface/media.interface'
import { PhTrash } from '@phosphor-icons/vue'

defineProps<{
  item: Media
  openOverlay: (state: boolean, mediaID: number) => void
  openDeleteDialog: (id: number) => void
}>()

const { formatFileSize } = useFileFormatter()
</script>

<template>
  <v-card
    color="white"
    class="tw-p-6 tw-rounded-lg tw-mb-6 tw-min-h-[278px] tw-cursor-pointer hover:tw-shadow-lg tw-relative"
    @click="openOverlay(true, item.id)"
  >
    <!-- 照片 -->
    <!-- <div
                class="tw-aspect-[4/3] tw-overflow-hidden tw-rounded tw-bg-surface tw-flex tw-items-center tw-justify-center tw-bg-center tw-bg-contain"
                :style="`background-image: url(${item.cdnUrl});`"
                loading="lazy"
              /> -->
    <div class="tw-aspect-[4/3] tw-overflow-hidden tw-rounded tw-bg-surface tw-flex tw-items-center tw-justify-center">
      <NuxtImg
        class="tw-object-cover tw-h-full"
        :src="item.cdnUrl"
        height="100%"
        fill="cover"
        loading="lazy"
      />
    </div>
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
    <div
      class="tw-absolute tw-p-2 tw-bottom-2 tw-right-2 tw-cursor-pointer hover:tw-text-red-600 tw-text-on-surface-60"
      @click.stop="openDeleteDialog(item.id)"
    >
      <PhTrash weight="bold" :size="20" />
    </div>
  </v-card>
</template>
