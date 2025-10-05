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
 * 刪除媒體檔案 by id
 * @param params
 * @param { type Number } mediaId 媒體檔案ID
 */
export const deleteMediaByIdAPI = (mediaId: number) => {
  return useFetchData.delete(`/v1/media/${mediaId}`, {}, 'album')
}
