<script setup lang="ts">
import { getUserInfoAPI } from '@/api/auth.api'
import { getInvoiceSettingsAPI, postMemberAvatarAPI, putMemberInfoAPI } from '@/api/member/setting.api'
import { PhCopy, PhFloppyDisk, PhImage } from '@phosphor-icons/vue'
import copy from 'copy-to-clipboard'

const userStore = useUserStore()
const { USER } = storeToRefs(userStore)
const notifyStore = useNotifyStore()

const refForm = ref()
const isLoading = ref(false)

// 裁切對話框相關
const showCropDialog = ref(false)
const selectedFile = ref<File | null>(null)

const form = ref({
  firstName: '',
  mobilePhone: ''
})

const coverImageFile: Ref<File | File[]> = ref([])
const localCoverImage = ref('')

const changeFile = (event: Event) => {
  if (!event.target) {
    localCoverImage.value = ''
    coverImageFile.value = []
    return
  }

  const file = (event.target as HTMLInputElement)?.files?.[0]
  if (file) {
    selectedFile.value = file
    showCropDialog.value = true
  }
}

// 處理裁切完成
const handleCropComplete = (croppedFile: File) => {
  coverImageFile.value = [croppedFile]

  // 顯示預覽圖片
  const reader = new FileReader()
  reader.onload = (e) => {
    localCoverImage.value = e.target?.result as string
  }
  reader.readAsDataURL(croppedFile)

  showCropDialog.value = false
  selectedFile.value = null
}

// 處理裁切取消
const handleCropCancel = () => {
  showCropDialog.value = false
  selectedFile.value = null
  coverImageFile.value = []
}

const putMemberInfo = async () => {
  const { success } = await putMemberInfoAPI({
    firstName: form.value.firstName,
    mobilePhone: form.value.mobilePhone
  })

  if (success) {
    console.log('更新成功')
  }
}

const updateAvatarImage = async () => {
  if (!Array.isArray(coverImageFile.value) || coverImageFile.value.length === 0 || !coverImageFile.value[0])
    return

  const { success } = await postMemberAvatarAPI({
    avatar: coverImageFile.value[0]
  })

  if (success) {
    console.log('封面更新成功')
  }
}

const fetchUserInfo = async () => {
  const { data, success } = await getUserInfoAPI()

  if (success && data) {
    form.value = {
      firstName: data.firstName || '',
      mobilePhone: data.mobilePhone || ''
    }
    localCoverImage.value = data.avatarUrl || ''
  }
}

const fetchInvoiceSettings = async () => {
  if (!USER.value?.id)
    return

  const { data, success } = await getInvoiceSettingsAPI()

  if (success && data) {
    // 處理發票設置數據
  }
}

// const createInvoiceSettings = async () => {
//   const requestData = {
//     invoiceType: 'PERSONAL',
//     phone: form.value.mobilePhone,
//     companyName: '示例有限公司',
//     companyTaxId: '12345678',
//     companyAddress: '台北市信義區信義路五段7號',
//     companyPhone: '0221234567'
//   }
//   // 呼叫 API 創建發票設置
//   await postInvoiceSettingsAPI(requestData)
// }
const save = async () => {
  const { valid } = await refForm.value?.validate()
  if (!valid) {
    return
  }

  const promiseList = []
  promiseList.push(putMemberInfo())
  // 只有在有新頭像圖檔時才呼叫更新頭像 API
  if (Array.isArray(coverImageFile.value) && coverImageFile.value.length > 0 && coverImageFile.value[0]) {
    promiseList.push(updateAvatarImage())
  }

  // promiseList.push(createInvoiceSettings())

  isLoading.value = true
  await Promise.all(promiseList).then(() => {
    notifyStore.SHOW_NOTIFY({ message: '儲存成功', type: 'success' })
    fetchUserInfo()
    userStore.GET_USER()
  }).catch(() => {
    notifyStore.SHOW_NOTIFY({ message: '儲存失敗，請稍後再試', type: 'error' })
  }).finally(() => {
    isLoading.value = false
  })
}

const copyLink = () => {
  copy(USER.value?.email || '')
  notifyStore.SHOW_NOTIFY({ message: '已複製', type: 'success' })
}

onMounted(() => {
  fetchUserInfo()
  fetchInvoiceSettings()
})

definePageMeta({
  middleware: 'auth'
})
</script>

<template>
  <v-main class="tw-flex tw-flex-col tw-min-h-[calc(100vh-70px)] tw-bg-[#fafafa] tw-relative">
    <div class="tw-sticky tw-top-[70px] tw-bg-[#fafafa] tw-z-10 tw-shadow-sm">
      <TitleBlockDefault>
        <template #left>
          <div class="tw-flex tw-items-center tw-cursor-pointer">
            <div class="tw-font-medium tw-text-base">
              會員管理
            </div>
          </div>
        </template>
      </TitleBlockDefault>
      <TitleBlockDefault>
        <template #right>
          <v-btn
            rounded
            :loading="isLoading"
            :disabled="isLoading"
            color="primary"
            class="tw-font-medium tw-text-sm"
            @click="save"
          >
            儲存
            <PhFloppyDisk size="16" class="tw-ml-1" />
          </v-btn>
        </template>
      </TitleBlockDefault>
    </div>
    <v-card
      :loading="isLoading"
      :disabled="isLoading"
      color="white"
      class="tw-mx-[40px] tw-my-4 tw-min-h-[calc(100vh-250px)] tw-px-6 tw-pt-6 tw-pb-10 tw-flex tw-gap-6 tw-rounded-lg"
    >
      <div class="tw-flex tw-w-full tw-gap-6 tw-p-10">
        <v-form ref="refForm" class="tw-w-[50%] tw-px-2">
          <div class="tw-font-medium tw-text-xl tw-mb-6">會員檔案</div>
          <div>
            <span class="tw-font-medium tw-text-sm">會員帳號</span>
            <v-text-field
              :value="USER?.email"
              class="tw-mt-[-8px]"
              variant="underlined"
              placeholder="請輸入會員帳號"
              readonly
            >
              <template #append-inner>
                <PhCopy size="20" class="tw-cursor-pointer" @click="copyLink" />
              </template>
            </v-text-field>
          </div>
          <div>
            <span class="tw-font-medium tw-text-sm">會員名稱</span>
            <v-text-field
              v-model="form.firstName"
              class="tw-mt-[-8px]"
              variant="underlined"
              :rules="[
                (v: string) => !!v || '必填',
              ]"
              placeholder="請輸入會員名稱"
              required
            />
          </div>
          <div>
            <span class="tw-font-medium tw-text-sm">行動電話</span>
            <v-text-field
              v-model="form.mobilePhone"
              class="tw-mt-[-8px]"
              variant="underlined"
              :rules="[
                (v: string) => !v || /^[0-9]{10}$/.test(v) || '請輸入正確的手機號碼',
              ]"
              placeholder="請輸入行動電話"
              required
            />
          </div>
          <template v-if="false">
            <div class="tw-font-medium tw-text-xl tw-my-6">進階檔案</div>
            <div>
              <span class="tw-font-medium tw-text-sm">公司名稱</span>
              <v-text-field
                v-model="form.firstName"
                class="tw-mt-[-8px]"
                variant="underlined"
                placeholder="請輸入公司名稱"
              />
            </div>
            <div>
              <span class="tw-font-medium tw-text-sm">公司統一編號</span>
              <v-text-field
                v-model="form.firstName"
                class="tw-mt-[-8px]"
                variant="underlined"
                placeholder="請輸入公司統一編號"
              />
            </div>
            <div>
              <span class="tw-font-medium tw-text-sm">公司地址</span>
              <v-text-field
                v-model="form.firstName"
                class="tw-mt-[-8px]"
                variant="underlined"
                placeholder="請輸入公司地址"
              />
            </div>
            <div>
              <span class="tw-font-medium tw-text-sm">公司電話</span>
              <v-text-field
                v-model="form.mobilePhone"
                class="tw-mt-[-8px]"
                variant="underlined"
                placeholder="請輸入公司電話"
              />
            </div>
          </template>
        </v-form>
        <div class="tw-w-[50%] tw-px-2">
          <div class="tw-font-medium tw-text-xl tw-mb-6">會員頭像</div>
          <template v-if="localCoverImage">
            <div class="tw-relative">
              <NuxtImg
                v-if="localCoverImage"
                :src="localCoverImage"
                class="tw-border tw-rounded-md tw-w-[300px]"
                alt="Cover Image"
              />
              <v-btn
                size="small"
                color="error"
                class="tw-mt-2 tw-absolute tw-top-0 tw-right-0"
                @click="localCoverImage = ''; coverImageFile = []"
              >
                變更會員頭像
              </v-btn>
            </div>
          </template>
          <template v-else>
            <v-file-upload
              v-model="coverImageFile"
              density="comfortable"
              variant="comfortable"
              @change="changeFile"
            >
              <template #icon>
                <PhImage size="54" class="tw-text-on-surface-20 tw-my-4" />
              </template>
              <template #title>
                <div class="tw-pb-8">
                  拖曳圖片到此處上傳
                  <div class="tw-text-sm tw-text-on-surface-60 tw-mt-1">
                    支援 JPG、PNG 檔案
                  </div>
                </div>
              </template>
            </v-file-upload>
            <div class="tw-mt-2 tw-text-sm tw-text-on-surface-60">* 最佳比例 1:1</div>
          </template>
        </div>
      </div>
    </v-card>

    <!-- 裁切對話框 -->
    <DialogImageCrop
      v-model="showCropDialog"
      :file="selectedFile"
      :aspect-ratio="{ width: 1, height: 1 }"
      @crop="handleCropComplete"
      @cancel="handleCropCancel"
    />
  </v-main>
</template>
