<script setup lang="ts">
import type { ApiRequestSignIn } from '@/types/interface/auth.interface'

const userStore = useUserStore()
const router = useRouter()

const form = ref<any>(null)
const inputLoginParams: Ref<ApiRequestSignIn> = ref({
  email: '',
  password: ''
})

const error: Ref<string> = ref('')
const loading: Ref<boolean> = ref(false)

// 處理登入邏輯
const handleLogin = async () => {
  error.value = ''
  const { valid } = await form.value.validate()

  if (!valid)
    return

  loading.value = true
  const { success, errorMessage } = await userStore.LOGIN(inputLoginParams.value)
  loading.value = false
  if (success) {
    // 登入成功，導航到儀表板
    error.value = ''
    router.push('/dashboard')
  } else {
    error.value = errorMessage || '登入失敗，請稍後再試'
  }
}
</script>

<template>
  <v-form ref="form" class=" tw-w-full tw-mt-8 tw-mx-auto tw-flex tw-flex-col tw-gap-4" @submit.prevent="handleLogin">
    <v-text-field
      v-model="inputLoginParams.email"
      :rules="[
        (v: string) => !!v || '必填',
        (v: string) => (v && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v)) || '請輸入正確的 Email',
      ]"
      required
      placeholder="會員信箱"
      prepend-inner-icon="mdi-account-outline"
      variant="underlined"
      color="primary"
    />
    <v-text-field
      v-model="inputLoginParams.password"
      :rules="[
        (v: string) => !!v || '必填',
        (v: string) => (v && v.length >= 6) || '密碼必須大於 6 個字符',
      ]"
      placeholder="密碼"
      prepend-inner-icon="mdi-key-outline"
      type="password"
      variant="underlined"
      color="primary"
      required
    />
    <div class="hover:tw-underline tw-text-right tw-mb-4 tw-line-height-8">
      <NuxtLink href="/auth?type=reset">忘記密碼？</NuxtLink>
    </div>
    <v-btn
      type="submit"
      rounded
      block
      :loading
    >
      登入
    </v-btn>
    <div v-if="error" class="tw-flex tw-items-center tw-gap-1 tw-justify-center tw-font-medium tw-bg-warn-10 tw-text-warn tw-p-4 tw-rounded-md">
      <v-icon>mdi-close</v-icon> {{ error }}
    </div>
  </v-form>
</template>
