<script setup lang="ts">
import { useTheme } from 'vuetify'

const notifyStore = useNotifyStore()
const userStore = useUserStore()
const theme = useTheme()
const drawer = ref(false)
const isDark = computed(() => theme.global.name.value === 'dark')

function toggleTheme() {
  theme.global.name.value = isDark.value ? 'light' : 'dark'
}

const logout = () => {
  userStore.LOGOUT()
  // 这里可以添加你的登出逻辑
  notifyStore.SHOW_NOTIFY({ message: '已登出', type: 'error' })
}
// 这里可以添加你的逻辑
definePageMeta({
  middleware: 'auth'
})
</script>

<template>
  <!-- 主要内容 -->
  <v-main>
    <ThemeDemo />
  </v-main>
</template>
