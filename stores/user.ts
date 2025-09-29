import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
// APIS
import { registerAPI, signInAPI } from '@/api/auth.api'
import type { ApiRequestRegister, ApiRequestSignIn, User } from '@/types/interface/auth.interface'

export const useUserStore = defineStore('user', () => {
  const router = useRouter()
  // TOKEN
  const TOKEN = useCookie('token')
  // USER 代表用户信息
  const USER = ref<User | null>(null)

  const IS_LOGIN = computed(() => !!USER.value?.name)

  const LOGIN = async (params: ApiRequestSignIn) => {
    const { success, message, data } = await signInAPI(params)
    if (success) {
      TOKEN.value = data?.token || ''
      USER.value = data?.user || null
      return {
        success: true,
        errorMessage: ''
      }
    } else {
      return {
        success: false,
        errorMessage: message
      }
    }
  }

  const REGISTER = async (params: ApiRequestRegister) => {
    const { success, message, data } = await registerAPI(params)
    console.log('Register API Response:', { success, message, data })
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

  const GET_USER = () => {
    TOKEN.value = 'xxxxxx'
    // USER.value = {
    //   name: 'Ian'
    // }
    router.push('/dashboard')
  }

  const LOGOUT = () => {
    TOKEN.value = ''
    USER.value = null
    router.push('/login')
  }

  return { TOKEN, USER, IS_LOGIN, LOGIN, REGISTER, GET_USER, LOGOUT }
})
