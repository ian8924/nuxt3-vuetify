import type { Album, ApiRequestCreateAlbum } from '@/types/interface/album.interface'

/**
 * 取得相簿 by id
 * @param params
 * @param { type String } userId 使用者ID
 */
export const getAlbumByIdAPI = (albumId: number) => {
  return useFetchData.get<Album>(`/v1/albums/${albumId}`, {}, 'album')
}

/**
 * 建立相簿
 * @param data
 */
export const createAlbumAPI = (data: ApiRequestCreateAlbum) => {
  return useFetchData.post<Album>(
    `/v1/albums`,
    data,
    'album'
  )
}

/**
 * 更新相簿 by id
 * @param params
 * @param { type String } userId 使用者ID
 */
export const patchAlbumByIdAPI = (albumId: number, params: Partial<Album>) => {
  return useFetchData.put<Album>(`/v1/albums/${albumId}`, params, 'album')
}

/**
 * 上傳相簿封面
 * @param albumId
 * @param params
 */
export const postAlbumCoverAPI = (albumId: number, params: { cover: File }) => {
  return useFetchData.post(`/v1/albums/${albumId}/cover`, params, 'album', true)
}
