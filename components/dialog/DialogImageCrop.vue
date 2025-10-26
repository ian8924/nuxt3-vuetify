<script setup lang="ts">
interface CropArea {
  x: number
  y: number
  width: number
  height: number
}

interface Props {
  modelValue: boolean
  file?: File | null
  aspectRatio?: { width: number, height: number }
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'crop', croppedFile: File): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  aspectRatio: () => ({ width: 4, height: 3 })
})

const emit = defineEmits<Emits>()

const show = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const cropContainer = ref<HTMLDivElement>()
const previewImg = ref('')
const imageSize = ref({ width: 0, height: 0 })
const containerSize = ref({ width: 0, height: 0 })
const scale = ref(1)

// 裁切區域
const cropArea = ref<CropArea>({
  x: 50,
  y: 50,
  width: 200,
  height: 150
})

// 拖拽狀態
const isDragging = ref(false)
const isResizing = ref(false)
const resizeHandle = ref('')
const dragStart = ref({ x: 0, y: 0 })

// 設置裁切區域
const setupCropArea = () => {
  if (!cropContainer.value || imageSize.value.width === 0) {
    return
  }

  const container = cropContainer.value
  containerSize.value = { width: container.clientWidth, height: container.clientHeight }

  // 計算縮放比例，圖片會保持比例並fit在容器內
  const scaleX = containerSize.value.width / imageSize.value.width
  const scaleY = containerSize.value.height / imageSize.value.height
  scale.value = Math.min(scaleX, scaleY)

  // 計算實際顯示尺寸
  const displayWidth = imageSize.value.width * scale.value
  const displayHeight = imageSize.value.height * scale.value

  // 計算圖片在容器中的偏移（圖片是居中的）
  const offsetX = (containerSize.value.width - displayWidth) / 2
  const offsetY = (containerSize.value.height - displayHeight) / 2

  // 設置初始裁切區域（置中，60%大小）
  const targetRatio = props.aspectRatio.width / props.aspectRatio.height
  let initWidth = displayWidth * 0.6
  let initHeight = initWidth / targetRatio

  // 確保不超出圖片範圍
  if (initHeight > displayHeight * 0.8) {
    initHeight = displayHeight * 0.8
    initWidth = initHeight * targetRatio
  }
  if (initWidth > displayWidth * 0.8) {
    initWidth = displayWidth * 0.8
    initHeight = initWidth / targetRatio
  }

  cropArea.value = {
    x: offsetX + (displayWidth - initWidth) / 2,
    y: offsetY + (displayHeight - initHeight) / 2,
    width: initWidth,
    height: initHeight
  }
}

// 載入並顯示圖片
const loadImage = async () => {
  if (!props.file) {
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    previewImg.value = e.target?.result as string

    // 載入圖片並計算尺寸
    const img = new Image()
    img.onload = () => {
      imageSize.value = { width: img.width, height: img.height }
      // 不在這裡調用 setupCropArea，而是等待圖片在 DOM 中渲染完成
    }
    img.src = previewImg.value
  }
  reader.readAsDataURL(props.file)
}// 開始拖拽
const handleStartDrag = (event: MouseEvent) => {
  if (isResizing.value) {
    return
  }

  isDragging.value = true
  const rect = cropContainer.value?.getBoundingClientRect()
  if (rect) {
    dragStart.value = {
      x: event.clientX - rect.left - cropArea.value.x,
      y: event.clientY - rect.top - cropArea.value.y
    }
  }
  event.preventDefault()
}

// 開始調整大小
const handleStartResize = (handle: string, event: MouseEvent) => {
  isResizing.value = true
  resizeHandle.value = handle
  event.stopPropagation()
  event.preventDefault()
}

// 更新裁切區域
const updateCrop = (event: MouseEvent) => {
  if (!isDragging.value && !isResizing.value)
    return
  if (!cropContainer.value)
    return

  const rect = cropContainer.value.getBoundingClientRect()
  const mouseX = event.clientX - rect.left
  const mouseY = event.clientY - rect.top

  // 計算圖片實際顯示區域
  const displayWidth = imageSize.value.width * scale.value
  const displayHeight = imageSize.value.height * scale.value
  const offsetX = (containerSize.value.width - displayWidth) / 2
  const offsetY = (containerSize.value.height - displayHeight) / 2

  if (isDragging.value) {
    // 拖拽移動
    let newX = mouseX - dragStart.value.x
    let newY = mouseY - dragStart.value.y

    // 限制在圖片範圍內
    const minX = offsetX
    const maxX = offsetX + displayWidth - cropArea.value.width
    const minY = offsetY
    const maxY = offsetY + displayHeight - cropArea.value.height

    newX = Math.max(minX, Math.min(newX, maxX))
    newY = Math.max(minY, Math.min(newY, maxY))

    cropArea.value.x = newX
    cropArea.value.y = newY
  } else if (isResizing.value) {
    // 調整大小
    const targetRatio = props.aspectRatio.width / props.aspectRatio.height
    const newArea = { ...cropArea.value }

    switch (resizeHandle.value) {
      case 'se': // 右下角
        newArea.width = mouseX - newArea.x
        newArea.height = newArea.width / targetRatio
        break
      case 'sw': // 左下角
        newArea.width = newArea.x + newArea.width - mouseX
        newArea.height = newArea.width / targetRatio
        newArea.x = mouseX
        break
      case 'ne': // 右上角
        newArea.width = mouseX - newArea.x
        newArea.height = newArea.width / targetRatio
        newArea.y = newArea.y + cropArea.value.height - newArea.height
        break
      case 'nw': // 左上角
        newArea.width = newArea.x + newArea.width - mouseX
        newArea.height = newArea.width / targetRatio
        newArea.x = mouseX
        newArea.y = newArea.y + cropArea.value.height - newArea.height
        break
    }

    // 限制最小尺寸和邊界
    const minSize = 50
    if (newArea.width >= minSize && newArea.height >= minSize) {
      if (newArea.x >= offsetX && newArea.y >= offsetY
        && newArea.x + newArea.width <= offsetX + displayWidth
        && newArea.y + newArea.height <= offsetY + displayHeight) {
        cropArea.value = newArea
      }
    }
  }
}

// 結束拖拽
const endDrag = () => {
  isDragging.value = false
  isResizing.value = false
  resizeHandle.value = ''
}

// 執行裁切
const performCrop = async () => {
  if (!props.file)
    return

  try {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        throw new Error('無法建立畫布')
      }

      // 計算實際裁切座標（考慮縮放和偏移）
      const displayWidth = imageSize.value.width * scale.value
      const displayHeight = imageSize.value.height * scale.value
      const offsetX = (containerSize.value.width - displayWidth) / 2
      const offsetY = (containerSize.value.height - displayHeight) / 2

      const actualX = (cropArea.value.x - offsetX) / scale.value
      const actualY = (cropArea.value.y - offsetY) / scale.value
      const actualWidth = cropArea.value.width / scale.value
      const actualHeight = cropArea.value.height / scale.value

      // 設置輸出尺寸（最大 1200px 寬）
      const maxWidth = 1200
      const outputScale = Math.min(maxWidth / actualWidth, 1)

      canvas.width = actualWidth * outputScale
      canvas.height = actualHeight * outputScale

      // 繪製裁切後的圖片
      ctx.drawImage(
        img,
        actualX,
        actualY,
        actualWidth,
        actualHeight,
        0,
        0,
        canvas.width,
        canvas.height
      )

      // 轉換為 File
      canvas.toBlob((blob) => {
        if (blob) {
          const croppedFile = new File(
            [blob],
            props.file!.name.replace(/\.(png|jpg|jpeg|gif|bmp|webp)$/i, '.jpg'),
            {
              type: 'image/jpeg',
              lastModified: Date.now()
            }
          )
          emit('crop', croppedFile)
          show.value = false
        }
      }, 'image/jpeg', 0.9)
    }
    img.src = URL.createObjectURL(props.file)
  } catch (error) {
    console.error('裁切失敗:', error)
  }
}

// 取消
const cancel = () => {
  emit('cancel')
  show.value = false
}

// 監聽檔案變化
watch(() => props.file, () => {
  if (props.file && show.value) {
    loadImage()
  }
}, { immediate: true })

// 監聽對話框開啟
watch(show, (newValue) => {
  if (newValue && props.file) {
    nextTick(() => {
      loadImage()
    })
  }
})

// 重新調整容器大小
const resizeContainer = () => {
  if (cropContainer.value && imageSize.value.width > 0) {
    const container = cropContainer.value
    containerSize.value = { width: container.clientWidth, height: container.clientHeight }
    setupCropArea()
  }
}

// 監聽窗口大小變化
onMounted(() => {
  window.addEventListener('mousemove', updateCrop)
  window.addEventListener('mouseup', endDrag)
  window.addEventListener('resize', resizeContainer)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', updateCrop)
  window.removeEventListener('mouseup', endDrag)
  window.removeEventListener('resize', resizeContainer)
})
</script>

<template>
  <v-dialog
    v-model="show"
    max-width="800px"
    persistent
  >
    <v-card>
      <v-card-title class="text-h5">
        裁切圖片
      </v-card-title>

      <v-card-text>
        <div class="text-body-2 mb-4">
          請拖拽選取要裁切的區域 (比例: {{ aspectRatio.width }}:{{ aspectRatio.height }})
        </div>

        <div
          ref="cropContainer"
          class="crop-container"
          style="position: relative; width: 100%; height: 400px; overflow: hidden; border: 1px solid #ccc; background: #f5f5f5;"
        >
          <img
            v-if="previewImg"
            :src="previewImg"
            class="preview-image"
            alt="預覽圖片"
            @load="() => nextTick(() => setupCropArea())"
          >

          <!-- 裁切選區 -->
          <div
            v-if="previewImg"
            class="crop-area"
            :style="{
              position: 'absolute',
              left: `${cropArea.x}px`,
              top: `${cropArea.y}px`,
              width: `${cropArea.width}px`,
              height: `${cropArea.height}px`,
              border: '2px solid #2196F3',
              cursor: 'move',
              backgroundColor: 'rgba(33, 150, 243, 0.1)',
            }"
            @mousedown="handleStartDrag"
          >
            <!-- 調整大小的控制點 -->
            <div
              class="resize-handle nw"
              :style="{
                position: 'absolute',
                top: '-4px',
                left: '-4px',
                width: '8px',
                height: '8px',
                backgroundColor: '#2196F3',
                cursor: 'nw-resize',
              }"
              @mousedown="(e) => handleStartResize('nw', e)"
            />
            <div
              class="resize-handle ne"
              :style="{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                width: '8px',
                height: '8px',
                backgroundColor: '#2196F3',
                cursor: 'ne-resize',
              }"
              @mousedown="(e) => handleStartResize('ne', e)"
            />
            <div
              class="resize-handle sw"
              :style="{
                position: 'absolute',
                bottom: '-4px',
                left: '-4px',
                width: '8px',
                height: '8px',
                backgroundColor: '#2196F3',
                cursor: 'sw-resize',
              }"
              @mousedown="(e) => handleStartResize('sw', e)"
            />
            <div
              class="resize-handle se"
              :style="{
                position: 'absolute',
                bottom: '-4px',
                right: '-4px',
                width: '8px',
                height: '8px',
                backgroundColor: '#2196F3',
                cursor: 'se-resize',
              }"
              @mousedown="(e) => handleStartResize('se', e)"
            />
          </div>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="grey"
          variant="text"
          @click="cancel"
        >
          取消
        </v-btn>
        <v-btn
          color="primary"
          variant="text"
          @click="performCrop"
        >
          確認裁切
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.crop-container {
  user-select: none;
}

.preview-image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.crop-area {
  box-sizing: border-box;
}

.resize-handle {
  box-sizing: border-box;
}

.resize-handle:hover {
  background-color: #1976D2 !important;
}
</style>
