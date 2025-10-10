<script lang="ts" setup>
import { PhCaretLeft, PhCaretRight, PhX } from '@phosphor-icons/vue'

const props = defineProps({
  imgUrl: {
    type: String,
    default: ''
  }
})

const emits = defineEmits(['clickPrevious', 'clickNext'])

const showOverlay = defineModel('modelValue', {
  type: Boolean,
  default: false
})
</script>

<template>
  <v-overlay
    v-model="showOverlay"
    opacity="0.8"
    :z-index="2000"
  >
    <div class="tw-w-[100vw] tw-h-[100vh] tw-relative">
      <div class="tw-absolute tw-top-4 tw-right-4">
        <v-icon-btn @click="showOverlay = false">
          <PhX weight="bold" :size="24" />
        </v-icon-btn>
      </div>
      <div class="tw-flex tw-justify-center tw-items-center tw-w-full tw-h-full">
        <nuxt-img
          :src="props.imgUrl"
          fit="contain"
          class="tw-rounded-lg tw-min-w-[50%] tw-max-w-full tw-max-h-full sm:tw-max-w-[90vw] sm:tw-max-h-[90vh]"
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
    </div>
  </v-overlay>
</template>
