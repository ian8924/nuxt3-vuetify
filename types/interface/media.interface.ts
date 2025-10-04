export interface Media {
  albumId: number
  cdnUrl: string
  createdAt: string
  description: string | null
  exif: string | null
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
  width: number | null
}
