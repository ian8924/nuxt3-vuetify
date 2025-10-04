<script setup lang="ts">
import { PhDesktop, PhImages, PhPencilSimpleLine } from '@phosphor-icons/vue'
import { ref } from 'vue'

const route = useRoute()
const albumStore = useAlbumStore()
const { ALBUM } = storeToRefs(albumStore)

const isSubMenuOpen = ref(true)
const listGroupOpen = ref() // 控制 list group 的開合狀態

onMounted(() => {
  nextTick(() => {
    listGroupOpen.value = ['album', 'website']
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
              <!-- 照片管理 -->
              <v-list-item class="tw-cursor-pointer" :active="route.name === 'album-id-pictures'" :to="`/album/${ALBUM?.id}/pictures`">
                <template #prepend>
                  <div class=" tw-flex tw-items-center tw-px-2 tw-py-2 tw-font-semibold tw-text-gray-600">
                    <PhImages size="16" class="tw-mr-3" />
                    照片管理
                  </div>
                </template>
              </v-list-item>
              <!-- 相簿管理 -->
              <v-list-group value="album">
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
                  :active="route.name === 'album-id-info'"
                  :to="`/album/${ALBUM?.id}/info`"
                >
                  <template #prepend>
                    <div class="tw-py-2 tw-ml-[-20px] tw-font-semibold tw-text-gray-600">
                      相簿資訊
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
                  :active="route.name === 'album-id-setting'"
                  :to="`/album/${ALBUM?.id}/setting`"
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
                  :active="route.name === 'album-id-frame'"
                  :to="`/album/${ALBUM?.id}/frame`"
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
      </client-only>
      <NuxtPage />
    </div>
  </v-app>
</template>
