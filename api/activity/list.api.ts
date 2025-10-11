import type { Activity, Tag, Theme } from '@/types/interface/activity.interface'
import type { ApiResponseList, ApiResponseSingle } from '@/types/interface/api.interface'
import type { ApiRequestListMedia, Media } from '@/types/interface/media.interface'

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
 *  取得活動標籤列表
 */
export const getTagsAPI = (params: any) => {
  return useFetchData.get<ApiResponseSingle<ApiResponseList<Tag[]>>>(
    `/v1/tags`,
    params,
    'activity'
  )
}

/**
 *  取得活動主題列表
 */
export const getThemesAPI = (params: any) => {
  return useFetchData.get<ApiResponseSingle<ApiResponseList<Theme[]>>>(
    `/v1/themes`,
    params,
    'activity'
  )
}
