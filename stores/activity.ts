import type { Activity } from '@/types/interface/activity.interface'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getActivityByIdAPI } from '~/api/activity/info.api'

export const useActivityStore = defineStore('activity', () => {
  const runtimeConfig = useRuntimeConfig()
  const baseURL = runtimeConfig.public.baseURL

  const isloading = ref(false)
  const ACTIVITY: Ref<Activity | null> = ref(null)

  const ACTIVITY_PUBLIC_LINK_WEBSITE = computed(() =>
    `${baseURL}/public/activity/${ACTIVITY?.value?.id}`
  )

  const GET_ACTIVITY_INFO = async (eventID: string) => {
    if (isloading.value)
      return
    isloading.value = true
    const { success, data } = await getActivityByIdAPI(eventID)
    isloading.value = false
    if (success && data) {
      ACTIVITY.value = data.data
    }
  }

  return { ACTIVITY, ACTIVITY_PUBLIC_LINK_WEBSITE, GET_ACTIVITY_INFO }
})
