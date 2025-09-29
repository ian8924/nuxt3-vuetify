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
  <v-form ref="form" class="tw-w-full tw-mt-8 tw-mx-auto tw-flex tw-flex-col tw-gap-4" @submit.prevent="handleLogin">
    <div class="tw-text-on-surface tw-text-md tw-mx-auto tw-mb-8">系統將寄送重設密碼連結至信箱</div>

    <v-text-field
      v-model="inputLoginParams.email"
      :rules="[
        (v: string) => !!v || '必填',
        (v: string) => (v && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v)) || '請輸入正確的 Email',
      ]"
      required
      placeholder="會員信箱"
      variant="underlined"
      color="primary"
    />

    <v-btn
      class="tw-mt-[200px]"
      type="submit"
      rounded
      block
      :loading
    >
      寄送重設密碼連結
    </v-btn>

    <div class="hover:tw-underline tw-text-center tw-font-medium tw-mt-4 tw-line-height-8">
      <NuxtLink href="/auth/login">返回登入</NuxtLink>
    </div>
  </v-form>
</template>
