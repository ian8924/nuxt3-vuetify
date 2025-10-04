import type { Album } from '@/types/interface/album.interface'
import type { ApiResponseSingle } from '@/types/interface/api.interface'
import type { Media } from '@/types/interface/media.interface'

/**
 * 取得媒體檔案 by id
 * @param params
 * @param { type String } mediaId 媒體檔案ID
 */
export const getMediaByIdAPI = (mediaId: number) => {
  return useFetchData.get<ApiResponseSingle<Media>>(`/v1/media/${mediaId}`, {}, 'album')
}

/**
 * 取得相簿 by id
 * @param params
 * @param { type String } userId 使用者ID
 */
export const getAlbumByIdAPI = (albumId: number) => {
  return useFetchData.get<Album>(`/v1/albums/${albumId}`, {}, 'album')
}
