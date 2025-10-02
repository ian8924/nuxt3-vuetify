<script setup lang="ts">
const route = useRoute()
definePageMeta({
  layout: 'layout-album',
  middleware: 'auth'
})
</script>

<template>
  <v-main>
    {{ route }}
  </v-main>
</template>
