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

/**
 * 上傳照片
 * @param params
 * @param { type Number } albumId 相簿ID
 * @param { type File } file 照片
 */
export const uploadMediaToAlbum = (albumId: number, data: { file: File }) => {
  return useFetchData.post(`/v1/albums/${albumId}/media`, data, 'album', true)
}
