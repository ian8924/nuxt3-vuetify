import type { Activity, ApiRequestActivity, ApiRequestCreateActivity, Tag } from '@/types/interface/activity.interface'
import type { ApiResponseSingle } from '@/types/interface/api.interface'

/**
 * 建立活動
 * @param data
 */
export const createActivityAPI = (data: ApiRequestCreateActivity) => {
  return useFetchData.post<ApiResponseSingle<Activity>>(
    `/v1/activities`,
    data,
    'activity'
  )
}

/**
 * 更新活動 by id
 * @param params
 * @param { type String } eventId 活動ID
 */
export const patchActivityByIdAPI = (eventId: string, params: Partial<ApiRequestActivity>) => {
  return useFetchData.put<Activity>(`/v1/activities/${eventId}`, params, 'activity', false, true)
}

/**
 * 透過 ID 取得活動資訊
 * @param eventID
 */
export const getActivityByIdAPI = (eventID: string) => {
  return useFetchData.get<ApiResponseSingle<Activity>>(
    `/v1/activities/${eventID}`,
    {},
    'activity'
  )
}

/**
 * 上傳活動封面
 * @param activityId
 * @param params
 */
export const postActivityCoverAPI = (activityId: number, params: { cover: File }) => {
  return useFetchData.post(`/v1/upload/activities/${activityId}/cover`, params, 'activity', true)
}

/**
 * 透過 ID 取得活動資訊
 * @param eventID
 */
export const postCreateTagAPI = (params: any) => {
  return useFetchData.post<ApiResponseSingle<Tag>>(
    `/v1/tags`,
    params,
    'activity'
  )
}
