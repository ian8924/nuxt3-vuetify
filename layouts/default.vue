<script setup lang="ts">
import { ref } from 'vue'

const isSubMenuOpen = ref(true)
</script>

<template>
  <v-app>
    <LayoutHeaderDefault />
    <div class="tw-flex tw-pt-[70px]">
      <LayoutMenuDefault v-model:open-sub-menu="isSubMenuOpen" :show-sub-menu-toggle="false" />
      <NuxtPage />
    </div>
  </v-app>
</template>
