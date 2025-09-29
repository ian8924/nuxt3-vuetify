import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotifyStore = defineStore('notify', () => {
  const IS_SHOW_NOTIFY = ref(false)
  // NOTIFY_INFO
  const NOTIFY_INFO = ref({
    message: '',
    type: '' as 'success' | 'error' | 'info' | 'warning' | ''
  })

  const SHOW_NOTIFY = (info: { message: string, type: 'success' | 'error' | 'info' | 'warning' | '' }) => {
    NOTIFY_INFO.value.message = info.message
    NOTIFY_INFO.value.type = info.type
    IS_SHOW_NOTIFY.value = true
    setTimeout(() => {
      NOTIFY_INFO.value.message = ''
      NOTIFY_INFO.value.type = ''
      IS_SHOW_NOTIFY.value = false
    }, 3000)
  }

  return { NOTIFY_INFO, IS_SHOW_NOTIFY, SHOW_NOTIFY }
})
