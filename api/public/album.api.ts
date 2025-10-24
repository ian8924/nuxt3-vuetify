import type { VisibilityEnum } from '@/types/enum/visibility.enum'
import type { Album } from '@/types/interface/album.interface'
import type { ApiResponseSingle } from '@/types/interface/api.interface'

/**
 * 取得相簿 visibility
 * @param folderId
 */
export const getFolderVisibilityAPI = (folderId: string) => {
  return useFetchData.get<ApiResponseSingle<{ visibility: VisibilityEnum }>>(`/v1/albums/folder/${folderId}/visibility`, {}, 'album')
}

/**
 * 取得公開相簿資訊 By folderId
 * @param folderId
 * @param sharedPassword
 */

export const getAlbumPublicByFolderIdAPI = (folderId: string, sharedPassword: string) => {
  return useFetchData.get<Album>(`/v1/albums/folder/${folderId}`, { sharedPassword }, 'album', false, false, false)
}
