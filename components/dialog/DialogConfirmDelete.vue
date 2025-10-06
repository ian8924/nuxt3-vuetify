<script setup>
defineProps({
  isLoadingDelete: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['confirm'])

const dialog = defineModel('modelValue', {
  type: Boolean,
  default: false
})

const input = ref('')

watch(() => dialog.value, (newVal) => {
  if (!newVal)
    input.value = ''
})
</script>

<template>
  <v-dialog
    v-model="dialog"
    max-width="500"
  >
    <v-card
      title="刪除照片"
    >
      <v-card-text class="tw-text-base tw-font-medium">
        請輸入 <span class="tw-font-bold">刪除照片</span> 以確認：
      </v-card-text>

      <v-text-field
        v-model="input"
        placeholder="刪除照片"
        variant="outlined"
        color="primary"
        class="tw-mx-6"
      />

      <v-card-text class="tw-text-base tw-font-medium tw-text-warn">
        刪除後將無法復原
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          text="取消"
          variant="plain"
          @click="dialog = false"
        />

        <v-btn
          :loading="isLoadingDelete"
          color="primary"
          text="確定刪除"
          :disabled="input !== '刪除照片'"
          variant="tonal"
          @click="emit('confirm')"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
