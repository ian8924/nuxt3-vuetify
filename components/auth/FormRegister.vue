<script setup lang="ts">
import type { ApiRequestRegister } from '@/types/interface/auth.interface'

const inputRegisterParams: Ref<ApiRequestRegister> = ref({
  email: '',
  password: '',
  repeartPassword: '',
  firstName: '',
  lastName: '',
  mobilePhone: ''
})

const checkbox: Ref<boolean> = ref(false)

const form = ref<any>(null)
const userStore = useUserStore()
const router = useRouter()
const error: Ref<string> = ref('')
const loading: Ref<boolean> = ref(false)

// 處理註冊邏輯
const handleRegister = async () => {
  error.value = ''
  const { valid } = await form.value.validate()

  if (!valid)
    return

  loading.value = true
  const { success, errorMessage } = await userStore.REGISTER(inputRegisterParams.value)
  loading.value = false
  if (success) {
    console.log('success')
    // 登入成功，導航到儀表板
    error.value = ''
    // router.push('/dashboard')
  } else {
    error.value = errorMessage || '註冊失敗，請稍後再試'
  }
}
</script>

<template>
  <v-form ref="form" class=" tw-w-full tw-mx-auto tw-flex tw-flex-col tw-pt-6" @submit.prevent="handleRegister">
    <v-text-field
      v-model="inputRegisterParams.email"
      :rules="[
        (v: string) => !!v || '必填',
        (v: string) => (v && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v)) || '請輸入正確的 Email',
      ]"
      required
      placeholder="會員信箱 *"
      variant="underlined"
      color="primary"
    />
    <v-text-field
      v-model="inputRegisterParams.password"
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
      v-model="inputRegisterParams.repeartPassword"
      :rules="[
        (v: string) => !!v || '必填',
        (v: string) => (v && v.length >= 6) || '密碼必須大於 6 個字符',
        (v: string) => (v && v === inputRegisterParams.password) || '兩次密碼必須相同',
      ]"
      placeholder="確認密碼 *"
      type="password"
      variant="underlined"
      color="primary"
      required
    />
    <v-text-field
      v-model="inputRegisterParams.lastName"
      :counter="10"
      :rules="[
        (v: string) => !!v || '必填',
      ]"
      required
      placeholder="名稱 *"
      variant="underlined"
      color="primary"
    />
    <v-text-field
      v-model="inputRegisterParams.mobilePhone"
      :counter="10"
      :rules="[
        (v: string) => !v || /^[0-9]{10}$/.test(v) || '請輸入正確的手機號碼',
      ]"
      required
      placeholder="手機"
      variant="underlined"
      color="primary"
    />

    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || '請勾選同意會員條款']"
    >
      <template #label>
        同意 <NuxtLink href="/auth?type=reset" target="_blank"> <span class="tw-underline tw-font-medium tw-mx-1">會員條款</span></NuxtLink>
      </template>
    </v-checkbox>

    <div v-if="error" class="tw-flex tw-items-center tw-gap-1 tw-justify-center tw-font-medium tw-bg-warn-10 tw-text-warn tw-p-2 tw-mb-4 tw-rounded-md">
      <v-icon>mdi-close</v-icon> {{ error }}
    </div>

    <v-btn
      class="tw-mt-2"
      type="submit"
      rounded
      block
    >
      註冊
    </v-btn>
    <div class="tw-mt-7">
      <v-divider color="primary-10" thickness="2px">
        <span class="tw-font-medium tw-text-primary">社群註冊</span>
      </v-divider>
    </div>
    <div class="tw-mt-7 tw-flex tw-justify-center tw-gap-10">
      <v-btn size="medium" color="white" class="tw-min-w-[60px] tw-min-h-[60px]">
        <NuxtImg src="/images/icons/google.svg" :width="24" />
      </v-btn>
      <v-btn size="medium" color="white" class="tw-min-w-[60px] tw-min-h-[60px]">
        <NuxtImg src="/images/icons/apple.svg" :width="24" />
      </v-btn>
    </div>
  </v-form>
</template>
