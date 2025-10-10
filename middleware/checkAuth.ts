export default defineNuxtRouteMiddleware(async () => {
  const UserStore = useUserStore()
  const { IS_LOGIN, TOKEN } = storeToRefs(UserStore)

  // 如果没有登录，并且有 TOKEN 则获取用户信息
  if (!IS_LOGIN.value && TOKEN.value) {
    await UserStore.GET_USER()
  }
})
