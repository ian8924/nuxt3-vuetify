import type { Album } from '@/types/interface/album.interface'

/**
 * 取得相簿 by id
 * @param params
 * @param { type String } userId 使用者ID
 */
export const getAlbumByIdAPI = (albumId: number) => {
  return useFetchData.get<Album>(`/v1/albums/${albumId}`, {}, 'album')
}
