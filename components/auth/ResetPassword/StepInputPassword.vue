<script setup lang="ts">
import { updatePasswordAPI } from '@/api/auth.api'
import type { ApiRequestUpdatePassword } from '@/types/interface/auth.interface'

const router = useRouter()
const notifyStore = useNotifyStore()

interface InputResetPassword {
  password: string
  repeatPassword: string
}

const form = ref<any>(null)
const inputResetParams: Ref<InputResetPassword> = ref({
  password: '',
  repeatPassword: ''
})

const error: Ref<string> = ref('')
const loading: Ref<boolean> = ref(false)

// 處理登入邏輯
const handleReset = async () => {
  error.value = ''
  const { valid } = await form.value.validate()

  if (!valid)
    return

  loading.value = true
  const request: ApiRequestUpdatePassword = {
    token: '',
    newPassword: inputResetParams.value.password
  }

  const { success, errorMessage } = await updatePasswordAPI(request)
  loading.value = false
  if (success) {
    error.value = ''
    notifyStore.SHOW_NOTIFY({ message: '重設密碼成功，請登入', type: 'success' })
    router.push('/auth/login')
  } else {
    error.value = errorMessage || '重設密碼失敗，請稍後再試'
  }
}
</script>

<template>
  <v-form ref="form" class="tw-w-full tw-mt-8 tw-mx-auto tw-flex tw-flex-col tw-gap-4" @submit.prevent="handleReset">
    <div class="tw-text-on-surface tw-text-md tw-mx-auto tw-mb-8">系統將寄送重設密碼連結至信箱</div>

    <v-text-field
      v-model="inputResetParams.password"
      :rules="[
        (v: string) => !!v || '必填',
        (v: string) => (v && v.length >= 6) || '密碼必須大於 6 個字符',
      ]"
      placeholder="密碼 *"
      type="password"
      variant="underlined"
      color="primary"
      required
    />
    <v-text-field
      v-model="inputResetParams.repeatPassword"
      :rules="[
        (v: string) => !!v || '必填',
        (v: string) => (v && v.length >= 6) || '密碼必須大於 6 個字符',
        (v: string) => (v && v === inputResetParams.password) || '兩次密碼必須相同',
      ]"
      placeholder="確認密碼 *"
      type="password"
      variant="underlined"
      color="primary"
      required
    />
    <v-btn
      class="tw-mt-[200px]"
      type="submit"
      rounded
      block
      :loading
    >
      送出
    </v-btn>

    <div class="hover:tw-underline tw-text-center tw-font-medium tw-mt-4 tw-line-height-8">
      <NuxtLink href="/auth/login">返回登入</NuxtLink>
    </div>
  </v-form>
</template>
