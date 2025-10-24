<script setup lang="ts">
import { postAlbumCoverAPI, putAlbumByIdAPI } from '@/api/album/info.api'
import { PhArrowLeft, PhFloppyDisk, PhImage } from '@phosphor-icons/vue'
import dayjs from 'dayjs'

const router = useRouter()
const route = useRoute()

const albumStore = useAlbumStore()
const { ALBUM, TOTAL_MEDIA_COUNT } = storeToRefs(albumStore)
const notifyStore = useNotifyStore()

const refForm = ref()
const isLoading = ref(false)

const form = ref({
  name: ALBUM.value?.name || '',
  description: ALBUM.value?.description || '',
  location: ALBUM.value?.location || '',
  startedAt: ALBUM.value?.startedAt || '',
  endedAt: ALBUM.value?.endedAt || ''
})

const coverImageFile: Ref<File | File[]> = ref([])
const localCoverImage = ref(ALBUM.value?.coverPhotoUrl || '')

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

const patchAlbum = async () => {
  const { success } = await putAlbumByIdAPI(ALBUM.value?.id as number, {
    name: form.value.name,
    description: form.value.description,
    location: form.value.location,
    startedAt: dayjs(form.value.startedAt).format('YYYY/MM/DD'),
    endedAt: dayjs(form.value.endedAt).format('YYYY/MM/DD')
  })

  if (success) {
    console.log('更新成功')
  }
}

const updateCoverImage = async () => {
  if (!Array.isArray(coverImageFile.value) || coverImageFile.value.length === 0 || !coverImageFile.value[0])
    return

  const { success } = await postAlbumCoverAPI(ALBUM.value?.id as number, {
    cover: coverImageFile.value[0]
  })

  if (success) {
    console.log('封面更新成功')
  }
}

const fetchAlbumInfo = async () => {
  const albumID = Number(route.params.albumID)
  if (!albumID)
    return

  await albumStore.GET_ALBUM_INFO(albumID)

  form.value = {
    name: ALBUM.value?.name || '',
    description: ALBUM.value?.description || '',
    location: ALBUM.value?.location || '',
    startedAt: ALBUM.value?.startedAt || '',
    endedAt: ALBUM.value?.endedAt || ''
  }
  localCoverImage.value = ALBUM.value?.coverPhotoUrl || ''
}

const save = async () => {
  const { valid } = await refForm.value?.validate()
  if (!valid) {
    return
  }

  const promiseList = []
  promiseList.push(patchAlbum())
  // 只有在有新封面圖檔時才呼叫更新封面 API
  if (Array.isArray(coverImageFile.value) && coverImageFile.value.length > 0 && coverImageFile.value[0]) {
    promiseList.push(updateCoverImage())
  }

  isLoading.value = true
  await Promise.all(promiseList).then(() => {
    notifyStore.SHOW_NOTIFY({ message: '儲存成功', type: 'success' })
    fetchAlbumInfo()
  }).catch(() => {
    notifyStore.SHOW_NOTIFY({ message: '儲存失敗，請稍後再試', type: 'error' })
  }).finally(() => {
    isLoading.value = false
  })
}

onMounted(() => {
  fetchAlbumInfo()
})

definePageMeta({
  layout: 'layout-album',
  middleware: ['auth', 'album']
})
</script>

<template>
  <v-main class="tw-flex tw-flex-col tw-min-h-[calc(100vh-70px)] tw-bg-[#fafafa] tw-relative">
    <div class="tw-sticky tw-top-[70px] tw-bg-[#fafafa] tw-z-10 tw-shadow-sm">
      <TitleBlockDefault>
        <template #left>
          <div class="tw-flex tw-items-center tw-cursor-pointer" @click="router.push('/admin/album')">
            <PhArrowLeft size="24" class="tw-mr-2" />
            <div class="tw-font-medium tw-text-base">
              相簿資訊
            </div>
          </div>
        </template>
        <template #right>
          <div class="tw-flex tw-gap-3 tw-text-sm tw-text-on-background">
            <span>
              相簿容量 {{ TOTAL_MEDIA_COUNT }} / 1500 張
            </span>
            <v-divider class="tw-my-auto" vertical length="10px" />
            <span>
              相簿大小：0 MB
            </span>
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
            <span class="tw-font-medium tw-text-sm">相簿名稱</span>
            <v-text-field
              v-model="form.name"
              class="tw-mt-[-8px]"
              variant="underlined"
              :rules="[
                (v: string) => !!v || '必填',
              ]"
              placeholder="請輸入相簿名稱"
              required
            />
          </div>
          <div>
            <span class="tw-font-medium tw-text-sm">描述</span>
            <v-text-field
              v-model="form.description"
              class="tw-mt-[-8px]"
              variant="underlined"
              placeholder="請輸入相簿描述"
            />
          </div>
          <div>
            <span class="tw-font-medium tw-text-sm">拍攝地點</span>
            <v-text-field
              v-model="form.location"
              class="tw-mt-[-8px]"
              variant="underlined"
              placeholder="請輸入拍攝地點"
            />
          </div>
          <div>
            <span class="tw-font-medium tw-text-sm">拍攝時間</span>
            <div class="tw-flex tw-items-center tw-gap-4">
              <v-date-input
                v-model="form.startedAt"
                input-format="yyyy/mm/dd"
                class="tw-mt-[-8px]"
                prepend-icon=""
                variant="underlined"
                placeholder="請輸入拍攝時間"
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
                class="tw-mt-[-8px]"
                prepend-icon=""
                variant="underlined"
                placeholder="請輸入拍攝時間"
                required
                :rules="[
                  (v: string) => !!v || '必填',
                  (v: string) => (new Date(v) >= new Date(form.startedAt)) || '結束時間需大於開始時間',
                ]"
              />
            </div>
          </div>
        </v-form>
        <div class="tw-w-[50%] tw-px-2">
          <div class="tw-font-medium tw-text-xl tw-mb-6">相簿封面</div>
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
