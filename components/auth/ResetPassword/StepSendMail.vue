<script setup lang="ts">

</script>

<template>
  <div class="tw-w-full tw-mx-auto tw-flex tw-flex-col tw-gap-4">
    <div class="tw-text-on-surface tw-text-md tw-mx-auto">系統將寄送重設密碼連結至信箱</div>
    <NuxtImg class="tw-w-[48px] tw-my-4 tw-mx-auto" src="/images/icons/reset-mail.svg" />
    <div class="tw-text-center tw-text-md text-font-medium tw-mx-auto tw-mb-8 tw-text-primary">
      已寄送變更密碼連結至信箱<br>
      請至信箱完成密碼變更
    </div>

    <div class="hover:tw-underline tw-text-center tw-font-medium tw-mt-4 tw-line-height-8">
      <NuxtLink href="/auth/login">返回登入</NuxtLink>
    </div>
  </div>
</template>
