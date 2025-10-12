import type { Participant } from '@/types/interface/activity.interface'
import type { ApiResponseSingle } from '@/types/interface/api.interface'

/**
 * 透過 ID 取得活動來賓或參與者
 * @param activityId
 */
export const getActivityParticipantsAPI = (activityId: number) => {
  return useFetchData.get<ApiResponseSingle<Participant[]>>(
    `/v1/activity-participants/activity/${activityId}`,
    {},
    'activity',
    false,
    true
  )
}

/**
 * 建立活動來賓或參與者
 * @param data
 */

export const createActivityParticipantsAPI = (data: Participant) => {
  return useFetchData.post<ApiResponseSingle<Participant>>(
    `/v1/activity-participants`,
    data,
    'activity',
    false,
    true
  )
}

/**
 * 更新活動來賓或參與者
 * @param participantId
 * @param data
 */
export const putParticipantAPI = (participantId: number, data: Participant) => {
  return useFetchData.put<ApiResponseSingle<Participant>>(
    `/v1/activity-participants/${participantId}`,
    data,
    'activity',
    true,
    true
  )
}

/**
 * 刪除活動來賓或參與者
 * @param participantId
 */
export const deleteParticipantAPI = (participantId: number) => {
  return useFetchData.delete<ApiResponseSingle<Participant>>(
    `/v1/activity-participants/${participantId}`,
    {},
    'activity',
    false,
    true
  )
}

export const uploadParticipantAvatarAPI = (participantId: number, avatar: File) => {
  return useFetchData.post<ApiResponseSingle<{ url: string }>>(
    `/v1/activity-participants/${participantId}/avatar`,
    { avatar },
    'activity',
    true,
    true
  )
}
