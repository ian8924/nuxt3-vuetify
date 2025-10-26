<script setup lang="ts">
const scrollToSection = (id: string) => {
  if (process.client) {
    const element = document.getElementById(id)
    if (element) {
      const elementPosition = element.offsetTop
      const offsetPosition = elementPosition - 70

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      // 更新 URL hash 但不跳轉
      history.pushState(null, '', `#${id}`)
    }
  }
}
</script>

<template>
  <div class="tw-fixed tw-top-0 tw-left-0 tw-right-0 tw-z-[1500] tw-hidden sm:tw-block">
    <div class="tw-px-10 tw-py-3 tw-flex tw-items-center tw-justify-between tw-border-b tw-border-surface tw-bg-white">
      <a href="/dashboard">
        <NuxtImg src="/images/web/logo.png" :width="71" class="tw-cursor-pointer" />
      </a>
      <div class="tw-flex tw-gap-6 tw-text-lg tw-font-medium tw-items-center">
        <a href="#activity-intro" class="tw-cursor-pointer" @click.prevent="scrollToSection('activity-intro')">
          活動簡介
        </a>
        <a href="#activity-album" class="tw-cursor-pointer" @click.prevent="scrollToSection('activity-album')">
          活動相簿
        </a>
        <a href="#activity-guests" class="tw-cursor-pointer" @click.prevent="scrollToSection('activity-guests')">
          活動來賓
        </a>
        <a href="#activity-organizers" class="tw-cursor-pointer" @click.prevent="scrollToSection('activity-organizers')">
          活動單位
        </a>
      </div>
    </div>
  </div>
</template>
