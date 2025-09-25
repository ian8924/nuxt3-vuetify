<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()
const isDark = computed(() => theme.global.name.value === 'dark')

function toggleTheme() {
  theme.global.name.value = isDark.value ? 'light' : 'dark'
}

const headers = [
  { title: '名称', key: 'name' },
  { title: '类型', key: 'type' },
  { title: '状态', key: 'status' }
]

const items = [
  { name: 'Vue.js', type: '框架', status: '活跃' },
  { name: 'Nuxt.js', type: '元框架', status: '活跃' },
  { name: 'Vuetify', type: 'UI库', status: '活跃' }
]

const colors = [
  { name: 'primary', value: 'primary' },
  { name: 'primary-10', value: 'primary-10' },
  { name: 'primary-30', value: 'primary-30' },
  { name: 'primary-50', value: 'primary-50' },
  { name: 'primary-80', value: 'primary-80' },
  { name: 'leis-primary-1', value: 'leis-primary-1' },
  { name: 'leis-primary-2', value: 'leis-primary-2' },
  { name: 'on-background', value: 'on-background' },
  { name: 'surface', value: 'surface' },
  { name: 'on-surface', value: 'on-surface' },
  { name: 'on-surface-80', value: 'on-surface-80' },
  { name: 'outline', value: 'outline' },
  { name: 'outline-variant', value: 'outline-variant' }
]
</script>

<template>
  <v-container>
    <!-- 主题切换按钮 -->
    <v-row class="mb-4">
      <v-col>
        <v-btn
          :icon="isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          class="custom-btn"
          size="large"
          @click="toggleTheme"
        />
        <span class="ml-2 tw-bg-secondary">
          {{ isDark ? '切换到浅色模式' : '切换到深色模式' }}
        </span>
      </v-col>
    </v-row>

    <!-- 自定义样式演示 -->
    <v-row>
      <!-- 按钮演示 -->
      <v-col cols="12" md="6">
        <v-card class="custom-card fade-in-up">
          <v-card-title>自定义按钮样式</v-card-title>
          <v-card-text>
            <v-btn class="ma-2" color="primary">主要按钮</v-btn>
            <v-btn class="ma-2" color="secondary">次要按钮</v-btn>
            <v-btn class="ma-2" color="success">成功按钮</v-btn>
            <v-btn class="ma-2" color="error">错误按钮</v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- 输入框演示 -->
      <v-col cols="12" md="6">
        <v-card class="custom-card fade-in-up">
          <v-card-title>自定义输入框样式</v-card-title>
          <v-card-text>
            <v-text-field
              color="secondary"
              label="用户名"
              prepend-inner-icon="mdi-account"
              class="mb-3"
            />
            <v-text-field
              label="密码"
              type="password"
              prepend-inner-icon="mdi-lock"
            />
          </v-card-text>
        </v-card>
      </v-col>

      <!-- 芯片演示 -->
      <v-col cols="12" md="6">
        <v-card class="custom-card fade-in-up">
          <v-card-title>自定义芯片样式</v-card-title>
          <v-card-text>
            <v-chip class="ma-1" color="primary">Vue.js</v-chip>
            <v-chip class="ma-1" color="secondary">Nuxt.js</v-chip>
            <v-chip class="ma-1" color="success">Vuetify</v-chip>
            <v-chip class="ma-1" color="info">TypeScript</v-chip>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- 数据表演示 -->
      <v-col cols="12" md="6">
        <v-card class="custom-card fade-in-up">
          <v-card-title>自定义数据表样式</v-card-title>
          <v-card-text>
            <v-data-table
              v-if="false"
              :headers="headers"
              :items="items"
              :items-per-page="3"
              class="custom-table"
            />
          </v-card-text>
        </v-card>
      </v-col>

      <!-- 颜色调色板 -->
      <v-col cols="12">
        <v-card class="custom-card fade-in-up">
          <v-card-title>自定义主题色彩</v-card-title>
          <v-card-text>
            <v-row>
              <v-col
                v-for="color in colors"
                :key="color.name"
                cols="6"
                sm="4"
                md="3"
              >
                <div class="text-center">
                  <div
                    class="mx-auto mb-2 rounded-circle"
                    :class="`tw-bg-${color.value}`"
                    style="width: 60px; height: 60px"
                  />
                  <div class="text-caption">{{ color.name }}</div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
