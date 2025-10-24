import type { VisibilityEnum } from '@/types/enum/visibility.enum'
import type { Activity } from '@/types/interface/activity.interface'
import type { ApiResponseSingle } from '@/types/interface/api.interface'

/**
 * 取得相簿 visibility
 * @param folderId
 */
export const getEventVisibilityAPI = (eventId: string) => {
  return useFetchData.get<ApiResponseSingle<{ visibility: VisibilityEnum }>>(`/v1/activities/${eventId}/visibility`, {}, 'activity')
}

/**
 * 透過 ID 取得活動資訊
 * @param eventID
 */
export const getActivityPublicByIdAPI = (eventID: string, password: string) => {
  return useFetchData.get<ApiResponseSingle<Activity>>(
    `/v1/activities/${eventID}`,
    { sharedPassword: password },
    'activity',
    false,
    false,
    false
  )
}
