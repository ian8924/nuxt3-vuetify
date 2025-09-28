<script setup lang="ts">
import FormLogin from '@/components/auth/FormLogin.vue'
import FormRegister from '@/components/auth/FormRegister.vue'

const tab: Ref<'login' | 'register'> = ref('login')
const route = useRoute()
const router = useRouter()

if (route.query.type === 'register') {
  tab.value = 'register'
} else {
  tab.value = 'login'
}

watch(tab, (newTab) => {
  if (newTab === 'register') {
    router.push({ query: { type: 'register' } })
  } else {
    router.push({ query: { type: 'login' } })
  }
})

definePageMeta({
  layout: 'layout-auth'
})
</script>

<template>
  <div class="tw-flex tw-pt-[56px] tw-max-w-[500px] tw-mx-auto tw-flex-col tw-items-center">
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
      <v-tab value="login">
        <span class="tw-text-lg tw-font-medium">
          登入
        </span>
      </v-tab>
      <v-tab value="register">
        <span class="tw-text-lg tw-font-medium">
          註冊
        </span>
      </v-tab>
    </v-tabs>

    <template v-if="tab === 'login'">
      <FormLogin />
    </template>
    <template v-else>
      <FormRegister />
    </template>
  </div>
</template>
