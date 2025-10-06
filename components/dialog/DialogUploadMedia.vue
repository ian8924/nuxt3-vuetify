<script setup lang="ts">
import { uploadMediaToAlbum } from '@/api/media/info.api'
import { PhCheckCircle } from '@phosphor-icons/vue'

const props = defineProps({
  albumId: {
    type: [Number],
    required: true
  }
})
const emits = defineEmits(['success'])

const notifyStore = useNotifyStore()

// const emit = defineEmits(['confirm'])
const isLoadingUpload = ref(false)
const successFileNames = ref<string[]>([])

const dialog = defineModel('modelValue', {
  type: Boolean,
  default: false
})

const files = ref([])

const uploadMediaToAlbumSingle = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  const request = {
    file
  }

  const { success } = await uploadMediaToAlbum(props.albumId, request)
  if (success) {
    successFileNames.value.push(file.name)
  }
}

const confirm = async () => {
  isLoadingUpload.value = true

  try {
    // 使用 Promise.all 並行上傳所有檔案
    const uploadPromises = files.value.map(file => uploadMediaToAlbumSingle(file))
    await Promise.all(uploadPromises)
    notifyStore.SHOW_NOTIFY({ message: '檔案上傳成功', type: 'success' })
    emits('success')
    // 所有檔案上傳完成後清空已選擇的檔案並關閉對話框
    files.value = []
    dialog.value = false
  } catch (error) {
    console.error('上傳失敗:', error)
  } finally {
    isLoadingUpload.value = false
  }
}
</script>

<template>
  <v-dialog
    v-model="dialog"
    max-width="500"
    :persistent="isLoadingUpload"
  >
    <v-card
      title="上傳照片"
    >
      <div class="tw-my-4 tw-px-6 tw-py-8 tw-border-2 tw-border-dashed tw-border-gray-300 tw-rounded-md">
        <v-file-upload
          v-model="files"
          class="tw-mx-6"
          density="comfortable"
          title="點擊或拖曳檔案到此處上傳"
          variant="comfortable"
          multiple
          accept="image/*"
          show-size
          clearable
          :disabled="isLoadingUpload"
        >
          <template #item="{ props: itemProps, file }">
            <v-file-upload-item
              v-bind="itemProps"
              lines="one"
            >
              <template #prepend>
                <v-avatar size="100" rounded></v-avatar>
              </template>

              <template #clear="{ props: clearProps }">
                <div v-if="successFileNames.includes(file.name)" class="tw-text-white tw-flex tw-items-center">
                  <PhCheckCircle size="24" color="green" />
                </div>
                <v-btn v-if="!isLoadingUpload" color="primary" v-bind="clearProps"></v-btn>
              </template>
            </v-file-upload-item>
          </template>
        </v-file-upload>
      </div>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          text="取消"
          variant="plain"
          @click="dialog = false"
        />

        <v-btn
          :loading="isLoadingUpload"
          :disabled="files.length === 0 || isLoadingUpload"
          color="primary"
          text="確定上傳"
          variant="tonal"
          @click="confirm"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
