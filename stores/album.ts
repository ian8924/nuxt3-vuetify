import { getAlbumByIdAPI } from '@/api/album/info.api'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Album } from '~/types/interface/album.interface'

export const useAlbumStore = defineStore('album', () => {
  const runtimeConfig = useRuntimeConfig()
  const baseURL = runtimeConfig.public.baseURL

  const isloading = ref(false)
  const ALBUM: Ref<Album | null> = ref(null)

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
    }
  }

  return { ALBUM, ALBUM_PUBLIC_LINK_WEBSITE, GET_ALBUM_INFO }
})
