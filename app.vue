<template>
  <div>
    <v-btn   
      prepend-icon="$vuetify"
      append-icon="$vuetify"
      variant="outlined"
    > 
     {{ name }}
    </v-btn>
    
    <!-- 环境信息显示 -->
    <div style="margin: 20px; padding: 10px; border: 1px solid #ccc; border-radius: 8px;">
      <h3>环境信息</h3>
      <p>当前环境: <strong>{{ environment }}</strong></p>
      <p>Node 环境: <strong>{{ nodeEnv }}</strong></p>
      <p>API 基础地址: {{ apiBase }}</p>
      <p>网站基础 URL: {{ baseUrl }}</p>
      <div style="margin-top: 10px; padding: 8px; background-color: #f5f5f5; border-radius: 4px;">
        <small>
          <strong>环境说明:</strong><br>
          • Local: 本地开发环境 🔧<br>
          • Dev: 远程开发环境 🧪<br>
          • Prod: 生产环境 🚀
        </small>
      </div>
    </div>
    
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

// 获取运行时配置
const config = useRuntimeConfig()
const environment = config.public.environment
const nodeEnv = config.public.nodeEnv
const apiBase = config.public.apiBase
const baseUrl = config.public.baseUrl

// access the `store` variable anywhere in the component ✨
const userStore = useUserStore()
const  { count, name, doubleCount } = storeToRefs(userStore)
</script>
