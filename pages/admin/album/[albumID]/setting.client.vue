<script setup lang="ts">
import { putAlbumByIdAPI } from '@/api/album/info.api'
import { VisibilityEnum } from '@/types/enum/visibility.enum'
import { PhArrowLeft, PhArrowSquareOut, PhCopy, PhFloppyDisk, PhQuestion } from '@phosphor-icons/vue'
import copy from 'copy-to-clipboard'

const router = useRouter()
const route = useRoute()

const albumStore = useAlbumStore()
const { ALBUM, ALBUM_PUBLIC_LINK_WEBSITE } = storeToRefs(albumStore)
const notifyStore = useNotifyStore()

const refForm = ref()
const isLoading = ref(false)

const form = ref({
  visibility: ALBUM.value?.visibility || 0,
  sharedPassword: ALBUM.value?.sharedPassword || ''
})

const visibilityOptions = [
  {
    value: VisibilityEnum.Public,
    text: '公開'
  },
  {
    value: VisibilityEnum.Private,
    text: '隱私'
  },
  {
    value: VisibilityEnum.Shared,
    text: '不公開（密碼保護）'
  }
]

const fetchAlbumInfo = async () => {
  const albumID = Number(route.params.albumID)
  if (!albumID)
    return

  await albumStore.GET_ALBUM_INFO(albumID)

  form.value = {
    visibility: ALBUM.value?.visibility || 0,
    sharedPassword: ALBUM.value?.sharedPassword || ''
  }
}

const patchAlbum = async () => {
  isLoading.value = true
  const { success } = await putAlbumByIdAPI(ALBUM.value?.id as number, {
    visibility: form.value.visibility,
    sharedPassword: form.value.sharedPassword
  })
  isLoading.value = false

  if (success) {
    notifyStore.SHOW_NOTIFY({ message: '儲存成功', type: 'success' })
    fetchAlbumInfo()
  } else {
    notifyStore.SHOW_NOTIFY({ message: '儲存失敗，請稍後再試', type: 'error' })
  }
}

const save = async () => {
  const { valid } = await refForm.value?.validate()
  if (!valid) {
    return
  }

  patchAlbum()
}

const openLink = () => {
  window.open(ALBUM_PUBLIC_LINK_WEBSITE.value, '_blank')
}

const copyLink = () => {
  copy(ALBUM_PUBLIC_LINK_WEBSITE.value)
  notifyStore.SHOW_NOTIFY({ message: '已複製連結', type: 'success' })
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
            <div>
              <span class="tw-font-medium tw-text-sm">公開網址 </span>
              <v-text-field
                v-model="ALBUM_PUBLIC_LINK_WEBSITE"
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
                :items="visibilityOptions"
              >
                <template #message>
                  <div class="tw-flex tw-text-xs tw-items-center tw-gap-1">
                    <PhQuestion size="16" /> 決定訪客是否可以瀏覽您的相簿
                  </div>
                </template>
              </v-select>
            </div>
            <div v-if="form.visibility === 2">
              <span class="tw-font-medium tw-text-sm">密碼</span>
              <v-text-field
                v-model="form.sharedPassword"
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
          </div>
        </v-form>
        <div class="tw-w-[50%]" />
      </div>
    </v-card>
  </v-main>
</template>
