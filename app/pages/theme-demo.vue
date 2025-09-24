<template>
  <v-app>
    <!-- 自定义应用栏 -->
    <v-app-bar class="custom-app-bar">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>Vuetify 自定义主题演示</v-toolbar-title>
      <v-spacer />
      <v-btn @click="toggleTheme" :icon="isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'" />
    </v-app-bar>

    <!-- 自定义导航抽屉 -->
    <v-navigation-drawer v-model="drawer" class="custom-drawer">
      <v-list>
        <v-list-item prepend-icon="mdi-home" title="首页" @click="navigateTo('/')" />
        <v-list-item prepend-icon="mdi-login" title="登录" @click="navigateTo('/login')" />
        <v-list-item prepend-icon="mdi-palette" title="主题演示" @click="navigateTo('/theme-demo')" />
      </v-list>
    </v-navigation-drawer>

    <!-- 主要内容 -->
    <v-main>
      <ThemeDemo />
    </v-main>
  </v-app>
</template>

<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()
const drawer = ref(false)
const isDark = computed(() => theme.global.name.value === 'dark')

const toggleTheme = () => {
  theme.global.name.value = isDark.value ? 'light' : 'dark'
}
</script>
