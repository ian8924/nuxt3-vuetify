import type { ActivityLink, ApiRequestCreateLink } from '@/types/interface/activity.interface'
import type { ApiResponseSingle } from '@/types/interface/api.interface'

/**
 * 透過 ID 取得活動Link
 * @param activityId
 */
export const getActivityLinksAPI = (activityId: number) => {
  return useFetchData.get<ApiResponseSingle<ActivityLink[]>>(
    `/v1/activity-links/activity/${activityId}`,
    {},
    'activity',
    false,
    true
  )
}

/**
 * 建立活動Link
 * @param data
 */
export const createActivityLinkAPI = (data: ApiRequestCreateLink) => {
  return useFetchData.post<ApiResponseSingle<ActivityLink>>(
    `/v1/activity-links`,
    data,
    'activity',
    false,
    true
  )
}

/**
 * 建立活動Link
 * @param linkId
 * @param data
 */
export const putActivityLinkAPI = (linkId: number, data: ApiRequestCreateLink) => {
  return useFetchData.put<ApiResponseSingle<ActivityLink>>(
    `/v1/activity-links/${linkId}`,
    data,
    'activity',
    false,
    true
  )
}

/**
 * 建立活動Link
 * @param linkId
 * @param data
 */
export const deleteActivityLinkAPI = (linkId: number) => {
  return useFetchData.delete<ApiResponseSingle<ActivityLink>>(
    `/v1/activity-links/${linkId}`,
    {},
    'activity',
    false,
    true
  )
}
