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

<template v-if="IS_SHOW_NOTIFY" class="tw-fixed tw-top-5 tw-right-5 tw-z-50">
  <v-snackbar
    v-model="IS_SHOW_NOTIFY"
    :timeout="5000"
    :color="notifyColor"
    rounded
    location="top right"
  >
    {{ NOTIFY_INFO.message }}
  </v-snackbar>
</template>
