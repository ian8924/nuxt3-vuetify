<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
const message = ref('')

const notify = (msg: string) => {
  message.value = msg
  show.value = true
}
</script>

<template v-if="show" class="tw-fixed tw-bottom-5 tw-right-5 tw-z-50">
  <v-snackbar
    v-model="show"
    :timeout="3000"
    color="success"
    multi-line
    elevation="2"
    rounded
  >
    {{ message }}
    <template #actions>
      <v-btn
        text
        @click="show = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
