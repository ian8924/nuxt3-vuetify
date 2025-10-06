<script setup lang="ts">
const userStore = useUserStore()
const notifyStore = useNotifyStore()

const { IS_LOGIN } = storeToRefs(userStore)

const logout = () => {
  userStore.LOGOUT()
  // 这里可以添加你的登出逻辑
  notifyStore.SHOW_NOTIFY({ message: '已登出', type: 'error' })
}
</script>

<template>
  <div class="tw-fixed tw-top-0 tw-left-0 tw-right-0 tw-z-[1500]">
    <div class="tw-px-10 tw-py-3 tw-flex tw-items-center tw-justify-between tw-border-b tw-border-surface tw-bg-white">
      <a href="/dashboard">
        <NuxtImg src="/images/web/logo.png" :width="71" class="tw-cursor-pointer" />
      </a>
      <div class="tw-flex tw-gap-6 tw-text-lg tw-font-medium tw-items-center">
        <a href="/">
          活動簡介
        </a>
        <a href="/">
          活動相簿
        </a>
        <a href="/">
          活動來賓
        </a>
        <a href="/">
          活動單位
        </a>
      </div>
    </div>
  </div>
</template>
