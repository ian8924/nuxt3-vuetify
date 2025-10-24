/* eslint-disable ts/no-use-before-define */
import { getAlbumByIdAPI, getAlbumMediaCountAPI } from '@/api/album/info.api'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Album } from '~/types/interface/album.interface'

export const useAlbumStore = defineStore('album', () => {
  const runtimeConfig = useRuntimeConfig()
  const baseURL = runtimeConfig.public.baseURL

  const isloading = ref(false)
  const ALBUM: Ref<Album | null> = ref(null)
  const TOTAL_MEDIA_COUNT: Ref<number> = ref(0)

  const ALBUM_PUBLIC_LINK_WEBSITE = computed(() =>
    `${baseURL}/public/album/${ALBUM?.value?.folderId}`
  )

  const GET_ALBUM_INFO = async (albumId: number) => {
    if (isloading.value)
      return
    isloading.value = true
    const { success, data } = await getAlbumByIdAPI(albumId)
    isloading.value = false
    if (success && data) {
      ALBUM.value = data
      GET_ALBUM_MEDIA_COUNT(albumId)
    }
  }

  const GET_ALBUM_MEDIA_COUNT = async (albumId: number) => {
    if (isloading.value)
      return
    isloading.value = true
    const { success, data } = await getAlbumMediaCountAPI(albumId)
    isloading.value = false
    if (success && data) {
      TOTAL_MEDIA_COUNT.value = data.data
    }
  }

  return { ALBUM, TOTAL_MEDIA_COUNT, ALBUM_PUBLIC_LINK_WEBSITE, GET_ALBUM_INFO, GET_ALBUM_MEDIA_COUNT }
})
