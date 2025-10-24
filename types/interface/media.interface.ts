import type { ApiRequestPagination } from './api.interface'

export interface Media {
  albumId: number
  cdnUrl: string
  createdAt: string
  description: string | null
  exif: {
    raw: string
  }
  fileId: string
  fileName: string
  height: number
  id: number
  locationLat: number | null
  locationLng: number | null
  mimeType: string
  sequence: number
  size: number
  status: number
  tags: string[] | null
  takenAt: string | null
  thumbnail375Url: string | null
  thumbnail480Url: string | null
  thumbnail1920Url: string | null
  thumbnailUrl: string | null
  title: string | null
  updatedAt: string | null
  uploadedBy: string | null
  url: string | null
  width: number
}

export interface MediaMetadata {
  name: string
  size: string
  resolution: string
  mp: string
  mode: string | null
  device: string
  focalLength: string
  aperture: string
  shutterSpeed: string
  iso: string
  datetime: string | null
  location: string
  url: string
  id: number | null
  title: string | null
  description: string | null
}

export interface ApiRequestListMedia extends ApiRequestPagination { keyword?: string, sharedPassword?: string }
