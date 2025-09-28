<script setup lang="ts">
import type { ApiRequestSignIn } from '@/types/interface/auth.interface'

const tab: Ref<'login' | 'register'> = ref('login')

const inputLoginParams: Ref<ApiRequestSignIn> = ref({
  email: 'ianliao0915+01@gmail.com',
  password: '1234563'
})

definePageMeta({
  layout: 'layout-auth'
})
</script>

<template>
  <div class="tw-flex tw-pt-[56px] tw-max-w-[400px] tw-mx-auto tw-flex-col tw-items-center">
    <div class="tw-text-2xl tw-font-bold tw-mb-8 tw-text-primary">
      樂見會員
    </div>
    <v-tabs
      v-model="tab"
      align-tabs="end"
      class="tw-w-full tw-mb-8"
      fixed-tabs
      color="primary"
    >
      <v-tab value="login">登入</v-tab>
      <v-tab value="register">註冊</v-tab>
    </v-tabs>
    <v-form class=" tw-w-full tw-mx-auto tw-flex tw-flex-col tw-gap-4" @submit.prevent>
      <v-text-field
        v-model="inputLoginParams.email"
        :counter="10"
        :rules="[
          (v: string) => !!v || 'Name is required',
          (v: string) => (v && v.length <= 10) || 'Name must be 10 characters or less',
        ]"
        required
        placeholder="Email"
        prepend-inner-icon="mdi-account"
        variant="underlined"
        color="primary"
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
        color="primary"
        required
      />
      <v-btn
        class="mt-2"
        type="submit"
        rounded
        block
      >
        登入
      </v-btn>
    </v-form>
  </div>
</template>
