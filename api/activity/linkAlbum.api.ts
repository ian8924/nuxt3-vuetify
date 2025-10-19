import type { Album } from '@/types/interface/album.interface'
import type { ApiResponseList } from '@/types/interface/api.interface'

/**
 * 取得使用者相簿列表
 * @param params
 */
export const getUserAlbumsUnlinkedAPI = (params: any) => {
  return useFetchData.get<ApiResponseList<Album[]>>(`/v1/albums/unlinked`, params, 'album')
}

/**
 * 取得活動相簿連結
 * @param activityID
 */
export const getAlbumLinkByActivityId = (activityID: number, params: any) => {
  return useFetchData.get(`/v1/albums/activity/${activityID}`, params, 'album')
}
