import type { Album } from '@/types/interface/album/albumList.interface'
import type { ApiResponseList } from '@/types/interface/api.interface'

/**
 * 取得使用者相簿列表
 * @param params
 * @param { type String } userId 使用者ID
 */
export const getUserAlbumsAPI = (userId: number) => {
  return useFetchData.get<ApiResponseList<Album[]>>(`/v1/albums/user/${userId}`, {}, 'album')
}
