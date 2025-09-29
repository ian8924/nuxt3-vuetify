<script setup lang="ts">
import StepInputMail from '@/components/auth/ResetPassword/StepInputMail.vue'
import StepInputPassword from '@/components/auth/ResetPassword/StepInputPassword.vue'
import StepSendMail from '@/components/auth/ResetPassword/StepSendMail.vue'

const route = useRoute()
</script>

<template>
  <template v-if="route.query.step === 'step2'">
    <StepSendMail />
  </template>
  <template v-else-if="route.query.step === 'step3'">
    <StepInputPassword />
  </template>
  <template v-else>
    <StepInputMail />
  </template>
</template>
