/**
 * 圖片壓縮 composable
 */
export const useImageCompress = () => {
  /**
   * 壓縮圖片
   * @param file 原始檔案
   * @param options 壓縮選項
   * @param options.quality 壓縮品質 0.1-1.0
   * @param options.maxWidth 最大寬度
   * @param options.maxHeight 最大高度
   * @param options.format 輸出格式 'image/jpeg' | 'image/webp'
   * @returns 壓縮後的 File
   */
  const compressImage = (
    file: File,
    options: {
      quality?: number // 壓縮品質 0.1-1.0
      maxWidth?: number // 最大寬度
      maxHeight?: number // 最大高度
      format?: string // 輸出格式 'image/jpeg' | 'image/webp'
    } = {}
  ): Promise<File> => {
    return new Promise((resolve, reject) => {
      const {
        quality = 0.8,
        maxWidth = 1920,
        maxHeight = 1080,
        format = 'image/jpeg'
      } = options

      // 檢查是否為圖片檔案
      if (!file.type.startsWith('image/')) {
        resolve(file) // 非圖片檔案直接返回
        return
      }

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      img.onload = () => {
        try {
          // 計算新的尺寸，保持長寬比
          let { width, height } = img

          if (width > maxWidth) {
            height = (height * maxWidth) / width
            width = maxWidth
          }

          if (height > maxHeight) {
            width = (width * maxHeight) / height
            height = maxHeight
          }

          // 設置 canvas 尺寸
          canvas.width = width
          canvas.height = height

          // 繪製壓縮後的圖片
          ctx?.drawImage(img, 0, 0, width, height)

          // 轉換為 Blob
          canvas.toBlob(
            (blob) => {
              if (blob) {
                // 創建新的 File 對象
                const compressedFile = new File(
                  [blob],
                  file.name.replace(/\.(png|jpg|jpeg|gif|bmp|webp)$/i, format === 'image/jpeg' ? '.jpg' : '.webp'),
                  {
                    type: format,
                    lastModified: Date.now()
                  }
                )
                resolve(compressedFile)
              } else {
                reject(new Error('圖片壓縮失敗'))
              }
            },
            format,
            quality
          )
        } catch (error) {
          reject(error)
        }
      }

      img.onerror = () => {
        reject(new Error('圖片載入失敗'))
      }

      // 載入圖片
      img.src = URL.createObjectURL(file)
    })
  }

  /**
   * 批量壓縮圖片
   * @param files 檔案陣列
   * @param options 壓縮選項
   * @returns 壓縮後的檔案陣列
   */
  const compressImages = async (
    files: File[],
    options?: Parameters<typeof compressImage>[1]
  ): Promise<File[]> => {
    const compressPromises = files.map(file => compressImage(file, options))
    return Promise.all(compressPromises)
  }

  /**
   * 獲取圖片資訊
   * @param file 圖片檔案
   * @returns 圖片資訊
   */
  const getImageInfo = (file: File): Promise<{
    width: number
    height: number
    size: number
    type: string
  }> => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        reject(new Error('不是圖片檔案'))
        return
      }

      const img = new Image()
      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height,
          size: file.size,
          type: file.type
        })
      }
      img.onerror = () => reject(new Error('圖片載入失敗'))
      img.src = URL.createObjectURL(file)
    })
  }

  /**
   * 格式化檔案大小
   * @param bytes 位元組數
   * @returns 格式化後的大小字串
   */
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) {
      return '0 Bytes'
    }
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`
  }

  return {
    compressImage,
    compressImages,
    getImageInfo,
    formatFileSize
  }
}
