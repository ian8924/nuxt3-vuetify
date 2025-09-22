import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

export default defineNuxtRouteMiddleware(() => {
    console.log('login.global middleware')
//   if (process.env.NODE_ENV === 'test') {
//     return
//   }
//   const token = useCookie('token')
//   const UserStore = useUserStore()
//   const { USER_DATA_INIT } = UserStore
//   const { ISLOADING_USERDATA, ISLOGIN, USERDATA } = storeToRefs(UserStore)
//   if (
//     !ISLOADING_USERDATA.value &&
//     token.value &&
//     !ISLOGIN.value &&
//     !USERDATA.value
//   ) {
//     return USER_DATA_INIT()
//   }
})