<template>
  <div>
    <v-btn   
      prepend-icon="$vuetify"
      append-icon="$vuetify"
      variant="outlined"
    > 
     {{ name }}
    </v-btn>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

// access the `store` variable anywhere in the component ✨
const userStore = useUserStore()
const  { count, name, doubleCount } = storeToRefs(userStore)
</script>
