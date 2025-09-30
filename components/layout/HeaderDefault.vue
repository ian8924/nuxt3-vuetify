<script setup lang="ts">
const router = useRouter()

const userStore = useUserStore()
const notifyStore = useNotifyStore()

const { IS_LOGIN } = storeToRefs(userStore)

const logout = () => {
  userStore.LOGOUT()
  // 这里可以添加你的登出逻辑
  notifyStore.SHOW_NOTIFY({ message: '已登出', type: 'error' })
  router.push('/auth/login')
}
</script>

<template>
  <div class="tw-px-10 tw-py-3 tw-flex tw-items-center tw-justify-between tw-border-b tw-border-surface tw-bg-white">
    <a href="/dashboard">
      <NuxtImg src="/images/web/logo.png" :width="71" class="tw-cursor-pointer" />
    </a>
    <div class="tw-flex tw-gap-6 tw-text-lg tw-font-medium tw-items-center">
      <a href="/dashboard">
        樂見平台
      </a>
      <a href="/dashboard">
        常見問題
      </a>
      <template v-if="!IS_LOGIN">
        <v-btn color="primary" rounded @click="$router.push('/auth/login')">
          登入
          <v-icon size="large" class="tw-ml-1" color="white">
            mdi-account
          </v-icon>
        </v-btn>
      </template>
      <template v-else>
        <v-btn icon="mdi-logout" @click="logout" />
      </template>
    </div>
  </div>
</template>
