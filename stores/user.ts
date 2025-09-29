import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
// APIS
import { getUserInfoAPI, registerAPI, signInAPI } from '@/api/auth.api'
import type { ApiRequestRegister, ApiRequestSignIn, User } from '@/types/interface/auth.interface'

export const useUserStore = defineStore('user', () => {
  const router = useRouter()
  // TOKEN
  const TOKEN = useCookie('token')
  // USER 代表用户信息
  const USER = ref<User | null>(null)

  const IS_LOGIN = computed(() => !!USER.value?.name)

  const LOGIN = async (params: ApiRequestSignIn) => {
    const res = await signInAPI(params)
    if (res.success) {
      TOKEN.value = res.data?.token || ''
      USER.value = res.data?.user || null
    }
    return {
      success: res.success,
      errorMessage: res.errorMessage || ''
    }
  }

  const REGISTER = async (params: ApiRequestRegister) => {
    const res = await registerAPI(params)
    return {
      success: res.success,
      errorMessage: res.errorMessage || ''
    }
    console.log('Register API Response:', res)
    // if (success) {
    //   TOKEN.value = data?.token || ''
    //   USER.value = data?.user || null
    //   return {
    //     success: true,
    //     errorMessage: ''
    //   }
    // } else {
    //   return {
    //     success: false,
    //     errorMessage: message
    //   }
    // }
  }

  const GET_USER = async () => {
    const res = await getUserInfoAPI()

    if (res.success && res.data) {
      USER.value = res.data
    } else {
      USER.value = null
    }
  }

  const LOGOUT = () => {
    TOKEN.value = ''
    USER.value = null
    router.push('/login')
  }

  return { TOKEN, USER, IS_LOGIN, LOGIN, REGISTER, GET_USER, LOGOUT }
})
