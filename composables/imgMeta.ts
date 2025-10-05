import type { Media, MediaMetadata } from '~/types/interface/media.interface'

const BYTES_TO_MEGAPIXEL = 1000000

// 預設 EXIF 資料
const DEFAULT_EXIF = {
  mode: '自動',
  device: '未知設備',
  focalLength: '未知',
  aperture: '未知',
  shutterSpeed: '未知',
  iso: '未知'
}

const parseExifData = (exifData: { raw?: string | object }) => {
  if (!exifData?.raw) {
    return DEFAULT_EXIF
  }

  const exif
    = typeof exifData.raw === 'string'
      ? JSON.parse(exifData.raw)
      : exifData.raw

  return {
    mode: exif.ExposureMode || exif.exposureMode || DEFAULT_EXIF.mode,
    device:
          exif.Make && exif.Model
            ? `${exif.Make} ${exif.Model}`
            : exif.make && exif.model
              ? `${exif.make} ${exif.model}`
              : exif.Camera || exif.camera || DEFAULT_EXIF.device,
    focalLength:
          exif.FocalLength || exif.focalLength
            ? `${exif.FocalLength || exif.focalLength}mm`
            : DEFAULT_EXIF.focalLength,
    aperture:
          exif.FNumber || exif.fNumber || exif.Aperture || exif.aperture
            ? `f/${exif.FNumber || exif.fNumber || exif.Aperture || exif.aperture}`
            : DEFAULT_EXIF.aperture,
    shutterSpeed: (() => {
      const exposureTime
        = exif.ExposureTime
          || exif.exposureTime
          || exif.ShutterSpeed
          || exif.shutterSpeed
      return exposureTime
        ? `1/${Math.round(1 / exposureTime)}s`
        : DEFAULT_EXIF.shutterSpeed
    })(),
    iso:
          exif.ISO || exif.iso || exif.ISOSpeedRatings || exif.isoSpeedRatings
            ? `ISO ${exif.ISO || exif.iso || exif.ISOSpeedRatings || exif.isoSpeedRatings}`
            : DEFAULT_EXIF.iso
  }
}

export const useImgMeta = () => {
  const getImageMetadata = async (media: Media): Promise<MediaMetadata> => {
    const { formatFileSize } = useFileFormatter()
    const exifInfo = parseExifData(media.exif)
    return {
      name: media.fileName || '未知名稱',
      size: formatFileSize(media.size),
      resolution: `${media.width}x${media.height}`,
      mp: `${((media.width * media.height) / BYTES_TO_MEGAPIXEL).toFixed(1)} MP`,
      mode: exifInfo.mode,
      device: exifInfo.device,
      focalLength: exifInfo.focalLength,
      aperture: exifInfo.aperture,
      shutterSpeed: exifInfo.shutterSpeed,
      iso: exifInfo.iso,
      datetime: media.takenAt || media.createdAt,
      location:
          media.locationLat && media.locationLng
            ? `${media.locationLat}, ${media.locationLng}`
            : '未知位置',
      url: media.thumbnailUrl || '/blank.png',
      id: media.id,
      title: media.title,
      description: media.description
    }
  }

  return { getImageMetadata }
}
