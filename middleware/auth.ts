import { useUserStore } from '~~/stores/user'

export default defineNuxtRouteMiddleware(async (to) => {
  const UserStore = useUserStore()
  const { IS_LOGIN, TOKEN } = storeToRefs(UserStore)

  // 如果没有登录，并且有 TOKEN 则获取用户信息
  if (!IS_LOGIN.value && TOKEN.value) {
    await UserStore.GET_USER()
    return
  }

  if (!IS_LOGIN.value && to.path !== '/login') {
    return navigateTo('/auth/login')
  }
})
