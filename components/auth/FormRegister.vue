<script setup lang="ts">
import { signInAPI } from '@/api/auth.api'
import type { ApiRequestSignIn } from '@/types/interface/auth.interface'

const inputLoginParams: Ref<ApiRequestSignIn> = ref({
  email: 'ianliao0915+01@gmail.com',
  password: '1234563'
})

// 處理登入邏輯
const handleLogin = async () => {
  try {
    console.log('開始登入，參數：', inputLoginParams.value)
    const response = await signInAPI(inputLoginParams.value)
    console.log('登入成功：', response)
    // TODO: 處理登入成功後的邏輯（如導航到其他頁面）
  } catch (error) {
    console.error('登入失敗：', error)
  }
}
</script>

<template>
  <v-form class=" tw-w-full tw-mx-auto tw-flex tw-flex-col tw-gap-4" @submit.prevent="handleLogin">
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
      class="custom-text-field"
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
      class="custom-text-field"
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
</template>
