<script setup lang="ts">
import type { ApiRequestSignIn } from '@/types/interface/auth.interface'

const inputLoginParams: Ref<ApiRequestSignIn> = ref({
  email: 'ianliao0915+01@gmail.com',
  password: '1234563'
})

definePageMeta({
  layout: 'layout-auth'
})
</script>

<template>
  <div class="tw-flex tw-px-5">
    <v-form class=" tw-w-[600px] tw-mx-auto tw-flex tw-flex-col tw-gap-4" @submit.prevent>
      <v-text-field
        v-model="inputLoginParams.email"
        :counter="10"
        :rules="[
          (v: string) => !!v || 'Name is required',
          (v: string) => (v && v.length <= 10) || 'Name must be 10 characters or less',
        ]"
        label="Email"
        required
        variant="underlined"
        color="success"
      />
      <v-text-field
        v-model="inputLoginParams.password"
        :counter="10"
        :rules="[
          (v: string) => !!v || 'Password is required',
          (v: string) => (v && v.length <= 10) || 'Password must be 10 characters or less',
        ]"
        label="Password"
        type="password"
        variant="underlined"
        required
      />
      <v-btn class="mt-2" type="submit" block>Submit</v-btn>
    </v-form>
  </div>
</template>
