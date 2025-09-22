import { defineNuxtConfig } from 'nuxt/config';

// https://nuxt.com/docs/api/configuration/nuxt-config
const path = require('path')

// 获取当前环境
const nodeEnv = process.env.NODE_ENV || 'local'
const isLocal = nodeEnv === 'local'
const isDev = nodeEnv === 'dev'
const isProd = nodeEnv === 'prod'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: isLocal || isDev },
  
  // 环境变量配置
  runtimeConfig: {
    // 私有键（仅在服务端可用）
    apiSecret: process.env.API_SECRET_KEY,
    databaseUrl: process.env.DATABASE_URL,
    
    // 公共键（暴露给客户端）
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
      environment: process.env.NUXT_PUBLIC_ENVIRONMENT || 'local',
      nodeEnv: nodeEnv
    }
  },
  
  modules: ['vuetify-nuxt-module', '@pinia/nuxt'],
  
  alias: {
    '/@/': path.resolve('./')
  },
  
  // 构建配置
  nitro: {
    preset: isProd ? 'vercel' : undefined,
    prerender: {
      routes: ['/']
    }
  },
  
  // CSS 配置
  css: [],
  
  // 头部配置
  app: {
    head: {
      title: `Nuxt App - ${nodeEnv.toUpperCase()}`,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: `Nuxt 3 with Vercel deployment - ${nodeEnv} environment` }
      ]
    }
  },
  
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      /* vuetify options */
    }
  }
})