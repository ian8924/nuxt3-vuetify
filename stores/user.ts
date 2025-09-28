import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
// APIS
import { signInAPI } from '@/api/auth.api'
import type { ApiRequestSignIn } from '~/types/interface/auth.interface'

interface User {
  name: string
}

export const useUserStore = defineStore('user', () => {
  const router = useRouter()
  // TOKEN
  const TOKEN = useCookie('token')
  // USER 代表用户信息
  const USER = ref<User>({
    name: ''
  })

  const IS_LOGIN = computed(() => !!USER.value.name)

  const LOGIN = async (params: ApiRequestSignIn) => {
    const data = await signInAPI(params)
    console.log('Login API Response:', data)
    // console.log('Login API Status:', status)
  }

  const GET_USER = () => {
    TOKEN.value = 'xxxxxx'
    USER.value = {
      name: 'Ian'
    }
    router.push('/dashboard')
  }

  const LOGOUT = () => {
    TOKEN.value = ''
    USER.value = {
      name: ''
    }
    router.push('/login')
  }

  return { TOKEN, USER, IS_LOGIN, LOGIN, GET_USER, LOGOUT }
})
