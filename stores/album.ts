import { getAlbumByIdAPI } from '@/api/album/info.api'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Album } from '~/types/interface/album.interface'

export const useAlbumStore = defineStore('album', () => {
  const ALBUM: Ref<Album | null> = ref(null)

  const GET_ALBUM_INFO = async (albumId: number) => {
    console.log('1')
    const { success, data } = await getAlbumByIdAPI(albumId)
    if (success && data) {
      ALBUM.value = data
    }
  }

  return { ALBUM, GET_ALBUM_INFO }
})
