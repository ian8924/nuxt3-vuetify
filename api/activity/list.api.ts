import type { Album } from '@/types/interface/album.interface'
import type { ApiResponseList } from '@/types/interface/api.interface'
import type { ApiRequestListMedia, Media } from '@/types/interface/media.interface'

/**
 * 取得使用者活動列表
 * @param params
 * @param { type String } userId 使用者ID
 */
export const getUserAlbumsAPI = (userId: number, params: any) => {
  return useFetchData.get<ApiResponseList<Album[]>>(`/v1/albums/user/${userId}`, params, 'album')
}

/**
 * 取得相簿內的照片
 * @param params
 * @param { type String } userId 使用者ID
 */
export const getAlbumPicturesAPI = (albumId: number, params: ApiRequestListMedia) => {
  return useFetchData.get<ApiResponseList<Media[]>>(`/v1/albums/${albumId}/media`, params, 'album')
}
