<template>
  <div>
    <v-btn   
      prepend-icon="$vuetify"
      append-icon="$vuetify"
      variant="outlined"
    > 
     {{ name }}
    </v-btn>

    <div class="mt-4 mb-4 p-4 border text-red rounded mx-5">
        123
    </div>
    
    <!-- 环境信息显示 -->
    <div class="mt-4 mb-4 p-4 border border-gray-300 rounded mx-5">
      <h3>环境信息</h3>
      <p>当前环境: <strong>{{ environment }}</strong></p>
      <p>Node 环境: <strong>{{ nodeEnv }}</strong></p>
      <p>API 基础地址: {{ apiBase }}</p>
      <p>网站基础 URL: {{ sss }}</p>
      <div style="margin-top: 10px; padding: 8px; background-color: #f5f5f5; border-radius: 4px;">
        <small>
          <strong>环境说明:</strong><br>
          • Local: 本地开发环境 🔧<br>
          • Dev: 远程开发环境 🧪<br>
          • Prod: 生产环境 🚀
        </small>
      </div>
    </div>
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
const sss = config.public.sss

// access the `store` variable anywhere in the component ✨
const userStore = useUserStore()
const  { count, name, doubleCount } = storeToRefs(userStore)

// useHead({
//   title: 'My App',
//   meta: [
//     { name: 'description', content: 'My amazing site.' }
//   ],
//   bodyAttrs: {
//     class: 'test'
//   },
//   script: [ { innerHTML: 'console.log(\'Hello world\')' } ]
// })
</script>
