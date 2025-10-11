<script setup lang="ts">
import { deleteActivityByIdAPI, patchActivityByIdAPI } from '@/api/activity/info.api'
import { VisibilityEnum } from '@/types/enum/visibility.enum'
import { PhArrowLeft, PhArrowSquareOut, PhCopy, PhQuestion, PhTrash } from '@phosphor-icons/vue'
import copy from 'copy-to-clipboard'

const router = useRouter()
const route = useRoute()

const activityStore = useActivityStore()
const { ACTIVITY, ACTIVITY_PUBLIC_LINK_WEBSITE } = storeToRefs(activityStore)
const notifyStore = useNotifyStore()

const refForm = ref()
const isLoading = ref(false)
const showConfirmDeleteDialog = ref(false)

const form = ref({
  visibility: ACTIVITY.value?.visibility || 0,
  sharedPassword: ACTIVITY.value?.sharedPassword || ''
})

const fetchActivityInfo = async () => {
  const activityID = route.params.activityID as string
  if (!activityID)
    return

  await activityStore.GET_ACTIVITY_INFO(activityID)

  form.value = {
    visibility: ACTIVITY.value?.visibility || 0,
    sharedPassword: ACTIVITY.value?.sharedPassword || ''
  }
}

const patchActivity = async () => {
  isLoading.value = true
  if (!ACTIVITY.value?.eventId) {
    return
  }
  const { success } = await patchActivityByIdAPI(ACTIVITY.value?.eventId, {
    name: ACTIVITY.value?.name,
    startedAt: ACTIVITY.value?.startedAt,
    endedAt: ACTIVITY.value?.endedAt,
    visibility: form.value.visibility,
    sharedPassword: form.value.sharedPassword
  })
  isLoading.value = false

  if (success) {
    notifyStore.SHOW_NOTIFY({ message: '儲存成功', type: 'success' })
    fetchActivityInfo()
  } else {
    notifyStore.SHOW_NOTIFY({ message: '儲存失敗，請稍後再試', type: 'error' })
  }
}

const save = async () => {
  const { valid } = await refForm.value?.validate()
  if (!valid) {
    return
  }

  patchActivity()
}

const deleteActivity = async () => {
  showConfirmDeleteDialog.value = true
}

const confirmDelete = async () => {
  showConfirmDeleteDialog.value = false
  const { success } = await deleteActivityByIdAPI(ACTIVITY.value?.eventId as string)
  if (success) {
    notifyStore.SHOW_NOTIFY({ message: '活動已刪除', type: 'success' })
    router.push('/admin/activity')
  } else {
    notifyStore.SHOW_NOTIFY({ message: '刪除失敗，請稍後再試', type: 'error' })
  }
}

const openLink = () => {
  window.open(ACTIVITY_PUBLIC_LINK_WEBSITE.value, '_blank')
}

const copyLink = () => {
  copy(ACTIVITY_PUBLIC_LINK_WEBSITE.value)
  notifyStore.SHOW_NOTIFY({ message: '已複製連結', type: 'success' })
}

onMounted(() => {
  fetchActivityInfo()
})

definePageMeta({
  layout: 'layout-activity',
  middleware: ['auth', 'activity']
})
</script>

<template>
  <v-main class="tw-flex tw-flex-col tw-min-h-[calc(100vh-70px)] tw-bg-[#fafafa] tw-relative">
    <div class="tw-sticky tw-top-[70px] tw-bg-[#fafafa] tw-z-10 tw-shadow-sm">
      <TitleBlockDefault>
        <template #left>
          <div class="tw-flex tw-items-center tw-cursor-pointer" @click="router.push('/admin/activity')">
            <PhArrowLeft size="24" class="tw-mr-2" />
            <div class="tw-font-medium tw-text-base">
              基本設定
            </div>
          </div>
        </template>
      </TitleBlockDefault>
      <TitleBlockDefault>
        <template #right>
          <v-btn
            rounded
            color="transparent"
            class="tw-font-medium tw-text-sm tw-mr-3"
            @click="openLink"
          >
            查看網站
            <PhArrowSquareOut size="16" class="tw-ml-1" />
          </v-btn>
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
        <v-form ref="refForm" class="tw-w-[50%]">
          <div class="tw-font-medium tw-text-xl tw-mb-6">基本設定 </div>
          <div class="tw-flex tw-flex-col tw-gap-4">
            <!-- 公開網址 -->
            <div>
              <span class="tw-font-medium tw-text-sm">公開網址 </span>
              <v-text-field
                v-model="ACTIVITY_PUBLIC_LINK_WEBSITE"
                class="tw-border-b tw-border-[#565454bb] tw-rounded tw-mt-[-8px]"
                variant="underlined"
                hide-details
                readonly
              >
                <template #append-inner>
                  <PhCopy size="20" class="tw-cursor-pointer" @click="copyLink" />
                </template>
              </v-text-field>
            </div>
            <!-- 網站可見度 -->
            <div>
              <span class="tw-font-medium tw-text-sm">網站可見度 </span>
              <v-select
                v-model="form.visibility"
                class="tw-mt-[-8px]"
                color="black"
                variant="underlined"
                placeholder="請選擇網站可見度"
                hint="1"
                persistent-hint
                item-title="text"
                item-value="value"
                :return-object="false"
                :items="[
                  {
                    value: VisibilityEnum.Public, text: '公開',
                  },
                  {
                    value: VisibilityEnum.Private, text: '隱私',
                  },
                  {
                    value: VisibilityEnum.Shared, text: '不公開（密碼保護）',
                  },
                ]"
              >
                <template #message>
                  <div class="tw-flex tw-text-xs tw-items-center tw-gap-1">
                    <PhQuestion size="16" /> 決定訪客是否可以瀏覽您的相簿
                  </div>
                </template>
              </v-select>
            </div>
            <!-- 密碼保護 -->
            <div v-if="form.visibility === 2">
              <span class="tw-font-medium tw-text-sm">密碼</span>
              <v-text-field
                v-model="form.sharedPassword"
                class="tw-mt-[-8px]"
                variant="underlined"
                placeholder="請輸入瀏覽密碼"
                hint="1"
                persistent-hint
                required
                :rules="[
                  (v: string) => !!v || '必填',
                ]"
              >
                <template #message>
                  <div class="tw-flex tw-text-xs tw-items-center tw-gap-1">
                    <PhQuestion size="16" /> 訪客需要輸入密碼才可瀏覽
                  </div>
                </template>
              </v-text-field>
            </div>
            <div class="tw-font-medium tw-text-xl tw-mt-6">刪除帳號 </div>
            <v-btn
              :loading="isLoading"
              :disabled="isLoading"
              color="error"
              variant="tonal"
              class="tw-font-medium tw-text-sm"
              @click="deleteActivity"
            >
              刪除活動
              <PhTrash size="16" class="tw-ml-1" />
            </v-btn>
            <div class="tw-text-sm tw-text-gray-600">
              刪除帳號後，您的所有資料將會被永久刪除且無法復原，請謹慎操作。
            </div>
          </div>
        </v-form>
        <div class="tw-w-[50%]" />
      </div>
    </v-card>
  </v-main>
  <DialogConfirmDeleteActivity v-model="showConfirmDeleteDialog" @confirm="confirmDelete" />
</template>
