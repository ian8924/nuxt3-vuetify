import type { ApiResponseList, ApiResponseSingle } from '@/types/interface/api.interface'
import type { ApiRequestListMedia, Media } from '@/types/interface/media.interface'
import type { Activity } from '~/types/interface/activity.interface'

/**
 * 取得使用者活動列表
 * @param params
 * @param { type String } userId 使用者ID
 */
export const getUserActivityListAPI = (params: any) => {
  return useFetchData.get<ApiResponseSingle<ApiResponseList<Activity[]>>>(`/v1/activities/my`, params, 'activity')
}

/**
 * 取得相簿內的照片
 * @param params
 * @param { type String } userId 使用者ID
 */
export const getAlbumPicturesAPI = (albumId: number, params: ApiRequestListMedia) => {
  return useFetchData.get<ApiResponseList<Media[]>>(`/v1/albums/${albumId}/media`, params, 'album')
}

/**
 * 透過 ID 取得活動資訊
 * @param eventID
 */
export const getTagsAPI = () => {
  return useFetchData.get<ApiResponseList<Activity>>(
    `/v1/tags`,
    {},
    'activity'
  )
}
