<script setup lang="ts">
import { patchActivityByIdAPI, postActivityCoverAPI } from '@/api/activity/info.api'
import { PhArrowLeft, PhFloppyDisk, PhImage } from '@phosphor-icons/vue'
import Dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

Dayjs.extend(utc)
const router = useRouter()
const route = useRoute()

const activityStore = useActivityStore()
const { ACTIVITY } = storeToRefs(activityStore)
const notifyStore = useNotifyStore()

const refForm = ref()
const isLoading = ref(false)

const form = ref({
  name: ACTIVITY.value?.name || '',
  description: ACTIVITY.value?.description || '',
  location: ACTIVITY.value?.location || '',
  startedAt: ACTIVITY.value?.startedAt || '',
  endedAt: ACTIVITY.value?.endedAt || '',
  activityTime: ACTIVITY.value?.activityTime || ''
})

const coverImageFile: Ref<File | File[]> = ref([])
const localCoverImage = ref(ACTIVITY.value?.coverPhotoUrl || '')

const changeFile = (event: Event) => {
  if (!event.target) {
    localCoverImage.value = ''
    coverImageFile.value = []
    return
  }

  const file = (event.target as HTMLInputElement)?.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      localCoverImage.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const patchActivity = async () => {
  if (!ACTIVITY.value?.eventId)
    return
  const { success } = await patchActivityByIdAPI(ACTIVITY.value.eventId, {
    name: form.value.name,
    description: form.value.description,
    location: form.value.location,
    startedAt: Dayjs.utc(form.value.startedAt).local(),
    endedAt: Dayjs.utc(form.value.endedAt).local(),
    activityTime: form.value.activityTime
  })

  if (success) {
    console.log('更新成功')
  }
}

const updateCoverImage = async () => {
  if (!Array.isArray(coverImageFile.value) || coverImageFile.value.length === 0 || !coverImageFile.value[0])
    return

  const { success } = await postActivityCoverAPI(ACTIVITY.value?.id as number, {
    cover: coverImageFile.value[0]
  })

  if (success) {
    console.log('封面更新成功')
  }
}

const fetchActivityInfo = async () => {
  const eventId = route.params.eventID as string
  if (!eventId)
    return

  await activityStore.GET_ACTIVITY_INFO(eventId)

  form.value = {
    name: ACTIVITY.value?.name || '',
    description: ACTIVITY.value?.description || '',
    location: ACTIVITY.value?.location || '',
    startedAt: Dayjs.utc(ACTIVITY.value?.startedAt).local().format('YYYY/MM/DD'),
    endedAt: Dayjs.utc(ACTIVITY.value?.endedAt).local().format('YYYY/MM/DD'),
    activityTime: ACTIVITY.value?.activityTime || ''
  }
  localCoverImage.value = ACTIVITY.value?.coverPhotoUrl || ''
}

const save = async () => {
  const { valid } = await refForm.value?.validate()
  if (!valid) {
    return
  }

  const promiseList = []
  promiseList.push(patchActivity())
  // 只有在有新封面圖檔時才呼叫更新封面 API
  if (Array.isArray(coverImageFile.value) && coverImageFile.value.length > 0 && coverImageFile.value[0]) {
    promiseList.push(updateCoverImage())
  }

  isLoading.value = true
  await Promise.all(promiseList).then((res) => {
    console.log('儲存成功', res)
    notifyStore.SHOW_NOTIFY({ message: '儲存成功', type: 'success' })
    fetchActivityInfo()
  }).catch(() => {
    notifyStore.SHOW_NOTIFY({ message: '儲存失敗，請稍後再試', type: 'error' })
  }).finally(() => {
    isLoading.value = false
  })
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
              活動資訊
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
          <div class="tw-font-medium tw-text-xl tw-mb-6">基本資訊</div>
          <div>
            <span class="tw-font-medium tw-text-sm">活動名稱</span>
            <v-text-field
              v-model="form.name"
              variant="underlined"
              :rules="[
                (v: string) => !!v || '必填',
              ]"
              placeholder="請輸入相簿名稱"
              required
            />
          </div>
          <!-- <div>
            <span class="tw-font-medium tw-text-sm">描述</span>
            <v-text-field
              v-model="form.description"
              variant="underlined"
              placeholder="請輸入相簿描述"
            />
          </div> -->
          <div>
            <span class="tw-font-medium tw-text-sm">地點</span>
            <v-text-field
              v-model="form.location"
              variant="underlined"
              placeholder="請輸入活動地點"
            />
          </div>
          <div>
            <span class="tw-font-medium tw-text-sm">活動日期</span>
            <div class="tw-flex tw-items-center tw-gap-4">
              <v-date-input
                v-model="form.startedAt"
                input-format="yyyy/mm/dd"
                prepend-icon=""
                variant="underlined"
                placeholder="請輸入活動時間"
                required
                :rules="[
                  (v: string) => !!v || '必填',
                ]"
              />
              <div class="tw-mb-3">
                -
              </div>
              <v-date-input
                v-model="form.endedAt"
                input-format="yyyy/mm/dd"
                prepend-icon=""
                variant="underlined"
                placeholder="請輸入拍攝時間"
                required
                :rules="[
                  (v: string) => !!v || '必填',
                  (v: string) => (Dayjs(v) >= Dayjs(form.startedAt)) || '結束時間需大於開始時間',
                ]"
              />
            </div>
          </div>
          <div>
            <span class="tw-font-medium tw-text-sm">活動時間</span>
            <v-text-field
              v-model="form.activityTime"
              variant="underlined"
              placeholder="請輸入活動時間"
            />
          </div>
        </v-form>
        <div class="tw-w-[50%] tw-px-2">
          <div class="tw-font-medium tw-text-xl tw-mb-6">活動封面</div>
          <template v-if="localCoverImage">
            <div class="tw-relotive">
              <NuxtImg
                v-if="localCoverImage"
                :src="localCoverImage"
                class="tw-border tw-rounded-md tw-w-full"
                alt="Cover Image"
              />
              <v-btn
                size="small"
                color="error"
                class="tw-mt-2 tw-absolute tw-top-0 tw-right-0"
                @click="localCoverImage = ''; coverImageFile = []"
              >
                變更封面
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
            <div class="tw-mt-2 tw-text-sm tw-text-on-surface-60">* 最佳封面比例 4:3</div>
          </template>
        </div>
      </div>
    </v-card>
  </v-main>
</template>
