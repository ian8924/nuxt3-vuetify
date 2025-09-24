<template>
    <div>
        <h1>Dashboard</h1>
           <v-btn   
            prepend-icon="$vuetify"
            append-icon="$vuetify"
            variant="outlined"
            @click="userStore.LOGOUT()"
            > 
             logout
            </v-btn>
    </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

// 这里可以添加你的逻辑
definePageMeta({
  middleware: 'auth',
})
</script> 