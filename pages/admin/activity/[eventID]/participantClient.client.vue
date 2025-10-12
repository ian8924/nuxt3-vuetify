<script setup lang="ts">
import { createActivityParticipantsAPI, deleteParticipantAPI, getActivityParticipantsAPI, putParticipantAPI, uploadParticipantAvatarAPI } from '@/api/activity/participant.api'
import type { Participant } from '@/types/interface/activity.interface'
import { PhArrowLeft, PhArrowSquareOut, PhFloppyDisk, PhPlus, PhX } from '@phosphor-icons/vue'

const router = useRouter()

const activityStore = useActivityStore()
const { ACTIVITY, ACTIVITY_PUBLIC_LINK_WEBSITE } = storeToRefs(activityStore)
const notifyStore = useNotifyStore()

const refForm = ref()
const isLoading = ref(false)

const defaultParticipantClient: Participant = {
  id: 0,
  activityId: ACTIVITY.value?.id || 0,
  type: 'guest',
  title: '',
  name: '',
  url: '',
  avatarUrl: '',
  displayOrder: 1,
  createdAt: '',
  updatedAt: '',
  tempFile: null
}

const originalList = ref<Participant[]>([])
const list = ref<Participant[]>([])

const addLink = () => {
  list.value.push({ ...defaultParticipantClient, id: Date.now(), isNew: true })
}

const removeLink = (id?: number) => {
  list.value = list.value.filter(item => item.id !== id)
}

const fetchActivityLinks = async () => {
  if (!ACTIVITY.value?.id)
    return
  isLoading.value = true
  const { data, success } = await getActivityParticipantsAPI(ACTIVITY.value?.id)
  isLoading.value = false
  if (success) {
    list.value = structuredClone(data?.data)?.filter(item => item.type === 'guest') || []
    originalList.value = structuredClone(data?.data)?.filter(item => item.type === 'guest') || []
  }
}

const createApi = async (item: Participant) => {
  if (!ACTIVITY.value?.eventId) {
    return
  }
  const requests: Participant = {
    activityId: ACTIVITY.value?.id,
    type: 'guest',
    title: item.title,
    name: item.name,
    url: item.url
  }
  const { data, success } = await createActivityParticipantsAPI(requests)
  if (success && data?.data) {
    item.id = data.data.id
    if (item.tempFile && item.id) {
      await uploadParticipantAvatarAPI(item.id, item.tempFile)
    }
  }
}

const putApi = async (item: Participant) => {
  if (!item.id) {
    return
  }

  if (item.tempFile) {
    await uploadParticipantAvatarAPI(item.id, item.tempFile)
  }
  const requests = {
    activityId: ACTIVITY.value?.id,
    type: 'guest',
    title: item.title,
    name: item.name,
    url: item.url
  }
  await putParticipantAPI(item.id, requests)
}

const removeApi = async (id: number) => {
  if (!id) {
    return
  }
  await deleteParticipantAPI(id)
}

const save = async () => {
  const { valid } = await refForm.value?.validate()
  if (!valid) {
    return
  }
  const promiseList: Promise<void>[] = []
  list.value.forEach(async (item: Participant) => {
  // New item
    if (item.isNew) {
      promiseList.push(
        createApi(item)
      )
    }

    if (!item.isNew) {
      const originalItem = originalList.value.find(original => original.id === item.id)
      if (originalItem?.title !== item.title || originalItem?.url !== item.url || originalItem?.name !== item.name || item.tempFile) {
        promiseList.push(
          putApi(item)
        )
      }
    }
  })

  // Deleted items
  originalList.value.forEach(async (original) => {
    const exists = list.value.find(item => item.id === original.id)
    if (!exists && original.id) {
      promiseList.push(
        removeApi(original.id)
      )
    }
  })

  isLoading.value = true
  await Promise.all(promiseList).then(() => {
    notifyStore.SHOW_NOTIFY({ message: '儲存成功', type: 'success' })
    fetchActivityLinks()
  }).catch(() => {
    notifyStore.SHOW_NOTIFY({ message: '儲存失敗，請稍後再試', type: 'error' })
  }).finally(() => {
    isLoading.value = false
  })
}

const openLink = () => {
  window.open(ACTIVITY_PUBLIC_LINK_WEBSITE.value, '_blank')
}

const changeFile = (event: Event, item: Participant) => {
  if (!event.target) {
    item.tempFile = null
    return
  }

  const file = (event.target as HTMLInputElement)?.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      console.log('reader result', e.target?.result)
      item.avatarUrl = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

onMounted(() => {
  fetchActivityLinks()
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
              活動來賓
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
        <v-form ref="refForm" class="tw-w-full">
          <div class="tw-font-medium tw-text-xl tw-mb-6 tw-flex tw-items-center">
            新增來賓或參與者
            <v-btn
              rounded
              :loading="isLoading"
              :disabled="isLoading"
              color="primary"
              class="tw-font-medium tw-text-sm tw-ml-4"
              size="small"
              @click="addLink"
            >
              活動來賓
              <PhPlus size="16" class="tw-ml-1" />
            </v-btn>
          </div>
          <div class="tw-flex tw-flex-col tw-gap-4">
            <v-card
              v-for="item in list"
              :key="item.id"
              prepend-icon="mdi-link"
              width="full"
              color="surface-10"
            >
              <template #title>
                <div class="tw-flex tw-items-center tw-justify-between">
                  <span class="font-weight-black">來賓 </span>
                  <v-icon-btn color="transparent" size="small" @click="removeLink(item.id)">
                    <PhX weight="bold" :size="16" />
                  </v-icon-btn>
                </div>
              </template>

              <v-card-text class="tw-bg-white py-4 tw-flex tw-items-center tw-gap-6">
                <div class="flex-1">
                  <template v-if="item.avatarUrl">
                    <div class="tw-relative">
                      <NuxtImg
                        :src="item.avatarUrl"
                        class="tw-border tw-rounded-md tw-min-w-[150px] tw-min-h-[150px] tw-h-[150px] tw-w-[150px]"
                        alt="Cover Image"
                      />
                      <div class="tw-absolute tw-top-2 tw-right-2">
                        <v-icon-btn
                          color="surface-50"
                          size="small"
                          @click="item.avatarUrl = ''; item.tempFile = null"
                        >
                          <PhX weight="bold" :size="16" />
                        </v-icon-btn>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <v-file-upload
                      v-model="item.tempFile"
                      class="tw-h-[150px] tw-w-[150px]"
                      density="comfortable"
                      variant="comfortable"
                      @change="changeFile($event, item)"
                    >
                      <template #icon>
                        <PhImage size="32" class="tw-text-on-surface-20" />
                      </template>
                      <template #title>
                        <div class="tw-text-sm tw-flex tw-flex-col tw-items-center tw-justify-center tw-cursor-pointer">
                          上傳圖片
                        </div>
                      </template>
                    </v-file-upload>
                  </template>
                </div>
                <div class="tw-flex-1">
                  <span class="tw-font-medium tw-text-sm">頭銜 *</span>
                  <v-text-field
                    v-model="item.title"
                    class="tw-mt-[-8px]"
                    variant="underlined"
                    :rules="[
                      (v: string) => !!v || '必填',
                    ]"
                    required
                  >
                  </v-text-field>
                </div>
                <div class="tw-flex-1">
                  <span class="tw-font-medium tw-text-sm">名稱 *</span>
                  <v-text-field
                    v-model="item.name"
                    class="tw-mt-[-8px]"
                    variant="underlined"
                    :rules="[
                      (v: string) => !!v || '必填',
                    ]"
                    required
                  >
                  </v-text-field>
                </div>
                <div class="tw-flex-1">
                  <span class="tw-font-medium tw-text-sm">網址</span>
                  <v-text-field
                    v-model="item.url"
                    class="tw-mt-[-8px]"
                    variant="underlined"
                    :rules="[
                      (v: string) => !v || /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/.test(v) || '請輸入正確的網址',
                    ]"
                  >
                  </v-text-field>
                </div>
              </v-card-text>
            </v-card>
          </div>
        </v-form>
      </div>
    </v-card>
  </v-main>
</template>
