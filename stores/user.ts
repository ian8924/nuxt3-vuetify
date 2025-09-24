import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {
  const router = useRouter()
  // TOKEN 
  const TOKEN = useCookie('token')
  // USER 代表用户信息
  const USER = ref({
    name: '',  
  })

  const IS_LOGIN = computed(() => !!USER.value.name)

  const GET_USER = () => {
    TOKEN.value = 'xxxxxx'
    USER.value = {
      name: 'Ian',
    }
    router.push('/dashboard')
  }

  const LOGOUT = () => {
    TOKEN.value = ''
    USER.value = {
      name: '',
    }
    router.push('/login')

  }

  return {TOKEN, USER, IS_LOGIN, GET_USER, LOGOUT}
})