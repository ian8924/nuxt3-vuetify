<script setup lang="ts">
import { resetPasswordAPI } from '@/api/auth.api'
import type { ApiRequestResetPassword } from '@/types/interface/auth.interface'

const router = useRouter()
const route = useRoute()
const notifyStore = useNotifyStore()

const form = ref<any>(null)
const inputResetParams: Ref<ApiRequestResetPassword> = ref({
  email: '',
  token: (route.query.token as string) || ''
})

const error: Ref<string> = ref('')
const loading: Ref<boolean> = ref(false)

const handleReset = async () => {
  error.value = ''
  const { valid } = await form.value.validate()

  if (!valid)
    return

  loading.value = true
  const { success, errorMessage } = await resetPasswordAPI(inputResetParams.value)
  loading.value = false
  if (success) {
    error.value = ''
    router.push('/auth/reset?step=step2')
  } else {
    notifyStore.SHOW_NOTIFY({ message: errorMessage || '重設密碼失敗，請稍後再試', type: 'error' })
    error.value = errorMessage || '重設密碼失敗，請稍後再試'
  }
}
</script>

<template>
  <v-form ref="form" class="tw-w-full tw-mt-8 tw-mx-auto tw-flex tw-flex-col tw-gap-4" @submit.prevent="handleReset">
    <div class="tw-text-on-surface tw-text-md tw-mx-auto tw-mb-8">系統將寄送重設密碼連結至信箱</div>

    <v-text-field
      v-model="inputResetParams.email"
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
