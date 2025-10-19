<script setup lang="ts">
import type { Media } from '@/types/interface/media.interface'
import { PhCircle, PhTrash } from '@phosphor-icons/vue'

const props = withDefaults(defineProps<{
  item?: Media
  selectMode?: boolean
  selectMediaIDs?: number[]
  openOverlay?: (state: boolean, mediaID: number) => void
  openDeleteDialog?: (id: number) => void
}>(), {
  item: () => ({} as Media),
  selectMode: false,
  selectMediaIDs: () => [],
  openOverlay: () => {},
  openDeleteDialog: () => {}
})

const emit = defineEmits<{
  (e: 'toggleSelect', id: number): void
}>()

const { formatFileSize } = useFileFormatter()

const clickItem = () => {
  if (props.selectMode) {
    emit('toggleSelect', props.item.id)
  } else {
    props.openOverlay(true, props.item.id)
  }
}
</script>

<template>
  <v-card
    color="white"
    class="tw-p-6 tw-rounded-lg tw-mb-6 tw-min-h-[278px] tw-cursor-pointer hover:tw-shadow-lg tw-relative"
    @click="clickItem"
  >
    <div
      v-if="props.selectMode"
      class="tw-w-8 tw-h-8 tw-absolute tw-flex tw-justify-center tw-items-center tw-top-2 tw-right-2 tw-shadow-lg tw-border-2 tw-border-white tw-rounded-full"
    >
      <PhCircle
        v-if="props.selectMediaIDs.includes(props.item.id)"
        class="tw-text-white "
        :size="28"
        weight="fill"
      />
    </div>

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
      <v-tooltip :text="props.item.fileName" location="bottom">
        <template #activator="{ props: tooltipProps }">
          <div
            v-bind="tooltipProps"
            class="tw-font-medium tw-text-base tw-line-clamp-2 tw-break-words tw-h-[48px]"
          >
            {{ props.item.title || props.item.fileName }}
          </div>
        </template>
      </v-tooltip>
      <div class="tw-mt-2 tw-text-xs tw-text-on-surface-80">{{ formatFileSize(props.item.size) }}</div>
    </div>
    <div
      class="tw-absolute tw-p-2 tw-bottom-2 tw-right-2 tw-cursor-pointer hover:tw-text-red-600 tw-text-on-surface-60"
      @click.stop="props.openDeleteDialog(props.item.id)"
    >
      <PhTrash weight="bold" :size="20" />
    </div>
  </v-card>
</template>
