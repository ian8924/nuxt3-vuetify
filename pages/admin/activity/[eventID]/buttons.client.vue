<script setup lang="ts">
import { PhArrowLeft, PhArrowSquareOut, PhFloppyDisk, PhPlus, PhX } from '@phosphor-icons/vue'
import { createActivityLinkAPI, deleteActivityLinkAPI, getActivityLinksAPI, putActivityLinkAPI } from '~/api/activity/buttons.api'

const router = useRouter()

const activityStore = useActivityStore()
const { ACTIVITY, ACTIVITY_PUBLIC_LINK_WEBSITE } = storeToRefs(activityStore)
const notifyStore = useNotifyStore()

const refForm = ref()
const isLoading = ref(false)

interface ActivityLinkPayload {
  id: number
  text: string
  target: string
  isNew?: boolean
}

const defaultActivityLink: ActivityLinkPayload = {
  id: 0,
  text: '',
  target: '',
  isNew: true
}

const originalList = ref<ActivityLinkPayload[]>([])
const list = ref<ActivityLinkPayload[]>([])

const addLink = () => {
  list.value.push({ ...defaultActivityLink, id: Date.now() })
}

const removeLink = (id: number) => {
  list.value = list.value.filter(item => item.id !== id)
}

const fetchActivityLinks = async () => {
  if (!ACTIVITY.value?.id)
    return
  isLoading.value = true
  const { data, success } = await getActivityLinksAPI(ACTIVITY.value?.id)
  isLoading.value = false
  if (success) {
    list.value = structuredClone(data?.data) || []
    originalList.value = structuredClone(data?.data) || []
  }
}

const createLinkApi = async (item: ActivityLinkPayload) => {
  isLoading.value = true
  if (!ACTIVITY.value?.eventId) {
    return
  }
  const requests = {
    id: item.isNew ? undefined : item.id,
    activityId: ACTIVITY.value?.id,
    text: item.text,
    action: 'url',
    target: item.target,
    displayOrder: 1,
    isActive: true
  }
  await createActivityLinkAPI(requests)
}

const putLinkApi = async (item: ActivityLinkPayload) => {
  isLoading.value = true
  if (!ACTIVITY.value?.eventId) {
    return
  }
  const requests = {
    activityId: ACTIVITY.value?.id,
    text: item.text,
    action: 'url',
    target: item.target,
    displayOrder: 1,
    isActive: true
  }
  await putActivityLinkAPI(item.id, requests)
}

const removeLinkApi = async (id: number) => {
  isLoading.value = true
  if (!ACTIVITY.value?.eventId) {
    return
  }
  await deleteActivityLinkAPI(id)
}

const save = async () => {
  const { valid } = await refForm.value?.validate()
  if (!valid) {
    return
  }
  const promiseList: Promise<void>[] = []
  list.value.forEach(async (item: ActivityLinkPayload) => {
    // New item
    if (item.isNew) {
      promiseList.push(
        createLinkApi(item)
      )
    }

    if (!item.isNew) {
      const originalItem = originalList.value.find(original => original.id === item.id)
      if (originalItem?.text !== item.text || originalItem?.target !== item.target) {
        promiseList.push(
          putLinkApi(item)
        )
      }
    }
  })

  // Deleted items
  originalList.value.forEach(async (original) => {
    const exists = list.value.find(item => item.id === original.id)
    if (!exists) {
      promiseList.push(
        removeLinkApi(original.id)
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
              自訂按鈕
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
            自訂按鈕
            <v-btn
              rounded
              :loading="isLoading"
              :disabled="isLoading"
              color="primary"
              class="tw-font-medium tw-text-sm tw-ml-4"
              size="small"
              @click="addLink"
            >
              新增自訂按鈕
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
                  <span class="font-weight-black">按鈕</span>
                  <v-icon-btn color="transparent" size="small" @click="removeLink(item.id)">
                    <PhX weight="bold" :size="16" />
                  </v-icon-btn>
                </div>
              </template>

              <v-card-text class="tw-bg-white py-4 tw-flex tw-items-center tw-gap-6">
                <div class="tw-flex-1">
                  <span class="tw-font-medium tw-text-sm">按鈕名稱 *</span>
                  <v-text-field
                    v-model="item.text"
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
                  <span class="tw-font-medium tw-text-sm">網址 *</span>
                  <v-text-field
                    v-model="item.target"
                    class="tw-mt-[-8px]"
                    variant="underlined"
                    :rules="[
                      (v: string) => !!v || '必填',
                    ]"
                    required
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
