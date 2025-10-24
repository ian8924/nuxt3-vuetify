import type { VisibilityEnum } from '@/types/enum/visibility.enum'
import type { ApiResponseSingle } from '@/types/interface/api.interface'

/**
 * 取得相簿 visibility
 * @param folderId
 */
export const getEventVisibilityAPI = (eventId: string) => {
  return useFetchData.get<ApiResponseSingle<{ visibility: VisibilityEnum }>>(`/v1/activities/${eventId}/visibility`, {}, 'activity')
}
