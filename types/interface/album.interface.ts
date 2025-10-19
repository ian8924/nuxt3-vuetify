import type { ApiRequestPagination } from './api.interface'

export interface Album {
  activityId: number | null
  coverId: number
  sharedPassword: string
  coverInfo: {
    fileId: string
    fileName: string
  }
  cdnUrl: string
  fileId: string
  fileName: string
  height: number | null
  mimeType: string
  size: number
  width: number | null
  coverPhotoUrl: string
  createdAt: string
  createdBy: number
  createdFrom: number
  description: string
  endedAt: string
  folderId: string
  id: number
  location: string
  name: string
  startedAt: string
  status: number
  updatedAt: string
  visibility: number
}

export interface ApiRequestCreateAlbum {
  name: string
  description: string
  activityId?: number
  visibility: number
  location?: string
  startedAt: string
  endedAt: string
  sharedPassword?: string
}

export interface ApiRequestListAlbum extends ApiRequestPagination { keyword?: string }
