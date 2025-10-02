<template>
  <div class="tw-px-[40px] tw-py-4 tw-flex tw-justify-between tw-items-center tw-font-bold tw-border-b tw-border-surface">
    <div class="tw-flex tw-items-center tw-gap-2">
      <slot name="left" />
    </div>
    <div>
      <slot name="right" />
    </div>
  </div>
</template>
