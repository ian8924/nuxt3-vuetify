<script setup lang="ts">
import { PhDesktop, PhPencilSimpleLine } from '@phosphor-icons/vue'
import { ref } from 'vue'

const route = useRoute()
const activityStore = useActivityStore()
const { ACTIVITY } = storeToRefs(activityStore)

const isSubMenuOpen = ref(true)
const listGroupOpen = ref() // 控制 list group 的開合狀態

onMounted(() => {
  nextTick(() => {
    listGroupOpen.value = ['activity', 'website']
  })
})
</script>

<template>
  <v-app>
    <LayoutHeaderDefault />
    <div class="tw-flex tw-pt-[70px]">
      <LayoutMenuDefault v-model:open-sub-menu="isSubMenuOpen" />
      <client-only>
        <v-navigation-drawer
          v-model="isSubMenuOpen"
          :width="232"
          class="tw-pt-[70px]"
          color="#fafafa"
        >
          <v-card
            class="mx-auto"
            width="232"
            color="#fafafa"
            flat
          >
            <v-list v-model:opened="listGroupOpen" class="tw-font-medium tw-text-sm  tw-text-black">
              <!-- 活動管理 -->
              <v-list-group value="activity">
                <template #activator="{ props }">
                  <v-list-item
                    v-bind="props"
                  >
                    <div class="tw-flex tw-items-center tw-px-2 tw-py-2 tw-font-semibold tw-text-gray-600">
                      <PhPencilSimpleLine size="16" class="tw-mr-3" />
                      活動管理
                    </div>
                  </v-list-item>
                </template>

                <v-list-item
                  key="info"
                  value="info"
                  :active="route.name === 'admin-activity-eventID-info'"
                  :to="`/admin/activity/${ACTIVITY?.eventId}/info`"
                >
                  <template #prepend>
                    <div class="tw-py-2 tw-ml-[-20px] tw-font-semibold tw-text-gray-600">
                      活動資訊
                    </div>
                  </template>
                </v-list-item>
                <v-list-item
                  key="btn"
                  value="btn"
                  :active="route.name === 'admin-activity-eventID-buttons'"
                  :to="`/admin/activity/${ACTIVITY?.eventId}/buttons`"
                >
                  <template #prepend>
                    <div class="tw-py-2 tw-ml-[-20px] tw-font-semibold tw-text-gray-600">
                      自訂按鈕
                    </div>
                  </template>
                </v-list-item>
                <v-list-item
                  key="guest"
                  value="guest"
                  :active="false"
                  :to="`/admin/activity/${ACTIVITY?.eventId}/guest`"
                  disabled
                >
                  <template #prepend>
                    <div class="tw-py-2 tw-ml-[-20px] tw-font-semibold tw-text-gray-600">
                      活動來賓
                    </div>
                  </template>
                </v-list-item>
                <v-list-item
                  key="unit"
                  value="unit"
                  :active="false"
                  :to="`/admin/activity/${ACTIVITY?.eventId}/unit`"
                  disabled
                >
                  <template #prepend>
                    <div class="tw-py-2 tw-ml-[-20px] tw-font-semibold tw-text-gray-600">
                      活動單位
                    </div>
                  </template>
                </v-list-item>
                <v-list-item
                  key="unit"
                  value="unit"
                  :active="false"
                  :to="`/admin/activity/${ACTIVITY?.eventId}/unit`"
                  disabled
                >
                  <template #prepend>
                    <div class="tw-py-2 tw-ml-[-20px] tw-font-semibold tw-text-gray-600">
                      連結相簿
                    </div>
                  </template>
                </v-list-item>
              </v-list-group>
              <!-- 網站設定 -->
              <v-list-group value="website">
                <template #activator="{ props }">
                  <v-list-item
                    v-bind="props"
                  >
                    <div class="tw-flex tw-items-center tw-px-2 tw-py-2 tw-font-semibold tw-text-gray-600">
                      <PhDesktop size="16" class="tw-mr-3" />
                      網站設定
                    </div>
                  </v-list-item>
                </template>

                <v-list-item
                  key="setting"
                  value="setting"
                  :active="route.name === 'admin-activity-eventID-setting'"
                  :to="`/admin/activity/${ACTIVITY?.eventId}/setting`"
                >
                  <template #prepend>
                    <div class="tw-py-2 tw-ml-[-20px] tw-font-semibold tw-text-gray-600">
                      基本設定
                    </div>
                  </template>
                </v-list-item>

                <v-list-item
                  key="frame"
                  value="frame"
                  :active="route.name === 'admin-activity-eventID-frame'"
                  :to="`/admin/activity/${ACTIVITY?.eventId}/frame`"
                  disabled
                >
                  <template #prepend>
                    <div class="tw-py-2 tw-ml-[-20px] tw-font-semibold tw-text-gray-600">
                      樣式模板
                    </div>
                  </template>
                </v-list-item>
                <v-list-item
                  key="SEO"
                  value="SEO"
                  disabled
                >
                  <template #prepend>
                    <div class="tw-py-2 tw-ml-[-20px] tw-font-semibold tw-text-gray-600">
                      SEO設定
                    </div>
                  </template>
                </v-list-item>
              </v-list-group>
            </v-list>
          </v-card>
        </v-navigation-drawer>
      </client-only>
      <NuxtPage />
    </div>
  </v-app>
</template>
