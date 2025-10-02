<script setup lang="ts">
import { PhDesktop, PhImages, PhPencilSimpleLine } from '@phosphor-icons/vue'
import { ref } from 'vue'

const isSubMenuOpen = ref(true)

const admins = [
  ['Management', 'mdi-account-multiple-outline'],
  ['Settings', 'mdi-cog-outline']
]
</script>

<template>
  <v-app>
    <LayoutHeaderDefault />
    <div class="tw-flex tw-pt-[70px]">
      <LayoutMenuDefault v-model:open-sub-menu="isSubMenuOpen" />
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
          <v-list class="tw-font-medium tw-text-sm  tw-text-black">
            <!-- 照片管理 -->
            <v-list-item>
              <template #prepend>
                <div class="tw-flex tw-items-center tw-px-2 tw-py-2 tw-font-semibold tw-text-gray-600">
                  <PhImages size="16" class="tw-mr-3" />
                  照片管理
                </div>
              </template>
            </v-list-item>
            <!-- 相簿管理 -->
            <v-list-group>
              <template #activator="{ props }">
                <v-list-item
                  v-bind="props"
                >
                  <div class="tw-flex tw-items-center tw-px-2 tw-py-2 tw-font-semibold tw-text-gray-600">
                    <PhPencilSimpleLine size="16" class="tw-mr-3" />
                    相簿管理
                  </div>
                </v-list-item>
              </template>

              <v-list-item
                key="info"
                value="info"
              >
                <template #prepend>
                  <div class="tw-py-2 tw-ml-[-20px] tw-font-semibold tw-text-gray-600">
                    相簿資訊
                  </div>
                </template>
              </v-list-item>
            </v-list-group>
            <!-- 相簿管理 -->
            <v-list-group>
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
      <NuxtPage />
    </div>
  </v-app>
</template>
