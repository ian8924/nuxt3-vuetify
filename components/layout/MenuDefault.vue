<script setup lang="ts">
import { PhHouse, PhImages, PhSlidersHorizontal, PhTextIndent, PhTextOutdent, PhTicket, PhUser, PhWallet } from '@phosphor-icons/vue'

const isSubMenuOpen = defineModel('openSubMenu', {
  type: Boolean,
  default: true
})

const showSubMenuToggle = defineModel('showSubMenuToggle', {
  type: Boolean,
  default: true
})

const mainMenu = [
  { title: '首页', icon: PhHouse, path: '/dashboard', enable: true },
  { title: '相簿', icon: PhImages, path: '/admin/album', enable: true },
  { title: '活動', icon: PhTicket, path: '/admin/activity', enable: true },
  { title: '錢包', icon: PhWallet, path: '/admin/wallet', enable: false },
  { title: '設定', icon: PhSlidersHorizontal, path: '/admin/setting', enable: false },
  { title: '會員', icon: PhUser, path: '/admin/profile', enable: false }
]

const toggleDrawer = () => {
  isSubMenuOpen.value = !isSubMenuOpen.value
}
</script>

<template>
  <client-only>
    <!-- 側邊導航欄 -->
    <v-navigation-drawer
      permanent
      :width="74"
      color="white"
      class="tw-pt-[70px]"
    >
      <v-list density="compact" nav>
        <v-list-item
          v-for="item in mainMenu"
          :key="item.title"
          :value="item.path"
          :to="item.path"
          :active="item.path === $route.path"
          :disabled="!item.enable"
        >
          <div class="tw-flex tw-flex-col tw-items-center tw-py-1">
            <component :is="item.icon" size="24" />
            <div class="tw-text-xs tw-mt-1 tw-font-medium">{{ item.title }}</div>
          </div>
        </v-list-item>
      </v-list>
      <template v-if="showSubMenuToggle" #append>
        <div class="tw-flex tw-justify-center tw-mb-2">
          <v-icon-btn color="white" @click="toggleDrawer">
            <PhTextOutdent v-if="!isSubMenuOpen" weight="bold" :size="24" />
            <PhTextIndent v-else weight="bold" :size="24" />
          </v-icon-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </client-only>
</template>
