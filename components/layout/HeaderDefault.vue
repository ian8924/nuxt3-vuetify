<script setup lang="ts">
import { PhUser } from '@phosphor-icons/vue'

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
  <div class="tw-fixed tw-top-0 tw-left-0 tw-right-0 tw-z-[3000]">
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
        <client-only>
          <template v-if="!IS_LOGIN">
            <v-btn color="primary" rounded @click="$router.push('/auth/login')">
              <PhUser :size="16" class="tw-mr-1" />
              登入
            </v-btn>
          </template>
          <template v-else>
            <v-btn icon="mdi-logout" @click="logout" />
          </template>
        </client-only>
      </div>
    </div>
  </div>
</template>
