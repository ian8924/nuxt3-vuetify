<script setup>
defineProps({
  isloading: {
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

const onConfirmClick = () => {
  emit('confirm', input.value)
}

watch(() => dialog.value, (newVal) => {
  if (!newVal)
    input.value = ''
})
</script>

<template>
  <v-dialog
    v-model="dialog"
    max-width="500"
    no-click-animation
    persistent
    opacity="1"
  >
    <v-card
      title="此相簿不公開"
    >
      <v-card-text class="tw-text-base tw-font-medium">
        請輸入密碼：
      </v-card-text>

      <v-text-field
        v-model="input"
        placeholder="請輸入密碼"
        variant="outlined"
        color="primary"
        class="tw-mx-6"
      />

      <v-card-actions class="tw-flex tw-justify-center">
        <v-btn
          :loading="isloading"
          :disabled="input.length === 0 || isloading"
          color="primary"
          text="確認"
          variant="tonal"
          @click="onConfirmClick"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
