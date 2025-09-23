import { defineNuxtConfig } from 'nuxt/config';

// https://nuxt.com/docs/api/configuration/nuxt-config
const path = require('path')

// 获取当前环境


const env = require('./env')

const nodeEnv = process.env.MODE || 'local'
const mode: any = process.env.MODE ? process.env.MODE : 'dev'

export default defineNuxtConfig({
  devtools: { enabled: true },
  
  // 环境变量配置
  runtimeConfig: {

    // 私有键（仅在服务端可用）
    apiSecret: process.env.API_SECRET_KEY,
    databaseUrl: process.env.DATABASE_URL,

    // 公共键（暴露给客户端）
    public: {
      apiBase: env[mode].NUXT_PUBLIC_BASE_URL,
      baseUrl: env[mode].NUXT_PUBLIC_BASE_URL,
      environment: env[mode].NUXT_PUBLIC_ENVIRONMENT,
      nodeEnv: nodeEnv,
      sss: env[mode]
    }
  },
  
  modules: ['vuetify-nuxt-module', '@pinia/nuxt', '@nuxtjs/tailwindcss'],
  
  alias: {
    '/@/': path.resolve('./')
  },
  
  // 构建配置
  nitro: {
    preset: mode === 'prod' ? 'vercel' : undefined,
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