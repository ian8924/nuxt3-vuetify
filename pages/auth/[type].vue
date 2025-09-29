<script setup lang="ts">
import FormLogin from '@/components/auth/FormLogin.vue'
import FormRegister from '@/components/auth/FormRegister.vue'
import FormResetPassword from '@/components/auth/FormResetPassword.vue'

const tab: Ref<'login' | 'register' | 'reset'> = ref('login')
const route = useRoute()
const router = useRouter()

if (route.params.type === 'register') {
  tab.value = 'register'
} else if (route.params.type === 'reset') {
  tab.value = 'reset'
} else {
  tab.value = 'login'
}

definePageMeta({
  layout: 'layout-auth'
})
</script>

<template>
  <div class="tw-flex tw-pt-[56px] tw-max-w-[500px] tw-pb-6 tw-mx-auto tw-flex-col tw-items-center">
    <div class="tw-text-2xl tw-font-bold tw-mb-6 tw-text-primary">
      {{ tab === 'login' || tab === 'register' ? '樂見會員' : '重設密碼' }}
    </div>
    <v-tabs
      v-if="tab !== 'reset'"
      v-model="tab"
      align-tabs="end"
      class="tw-w-full tw-mb-2"
      fixed-tabs
      color="primary"
      @update:model-value="(value) => { router.push({ params: { type: (value) as 'login' | 'register' | 'reset' } }) }"
    >
      <v-tab
        value="login"
      >
        <span class="tw-text-lg tw-font-medium">
          登入
        </span>
      </v-tab>
      <v-tab value="register">
        <span class="tw-text-lg tw-font-medium">
          註冊
        </span>
      </v-tab>
      <v-tab v-show="false" value="reset">
        <span class="tw-text-lg tw-font-medium">
          重設密碼
        </span>
      </v-tab>
    </v-tabs>

    <template v-if="tab === 'login'">
      <FormLogin />
    </template>
    <template v-if="tab === 'register'">
      <FormRegister />
    </template>
    <template v-if="tab === 'reset'">
      <FormResetPassword />
    </template>
  </div>
</template>
