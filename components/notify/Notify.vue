<script setup lang="ts">
const notifyStore = useNotifyStore()

const { NOTIFY_INFO, IS_SHOW_NOTIFY } = storeToRefs(notifyStore)

const notifyColor = computed(() => {
  switch (NOTIFY_INFO.value.type) {
    case 'success':
      return 'leis-secondary-green'
    case 'error':
      return 'red'
    case 'warning':
      return 'orange'
    case 'info':
      return 'blue'
    default:
      return 'grey'
  }
})
</script>

<template>
  <v-snackbar
    v-model="IS_SHOW_NOTIFY"
    z-index="2000"
    :timeout="3000"
    :color="notifyColor"
    rounded
    location="top right"
  >
    {{ NOTIFY_INFO.message }}
  </v-snackbar>
</template>
