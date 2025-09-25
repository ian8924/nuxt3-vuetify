import { defineNuxtConfig } from 'nuxt/config'
import variableVuetify from './assets/styles/variable/variable.vuetify.js'

// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path'

// 获取当前环境

import { env } from './env'

const nodeEnv = process.env.MODE || 'local'
const allowedModes = ['local', 'dev', 'prod'] as const
type Mode = typeof allowedModes[number]
const mode: Mode = allowedModes.includes(process.env.MODE as Mode) ? process.env.MODE as Mode : 'dev'

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

  modules: ['vuetify-nuxt-module', '@pinia/nuxt', '@nuxtjs/tailwindcss', '@nuxt/eslint'],
  // eslint: {
  //   checker: true // <---
  // },
  alias: {
    '/@/': path.resolve('./')
  },

  nitro: {
    preset: mode === 'prod' ? 'vercel' : undefined,

    prerender: {
      routes: ['/login']
    }
  },

  // CSS 配置
  // css: [
  //   '@/assets/styles/custom-vuetify.css'
  // ],

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
      // styles: {
      //   configFile: 'assets/styles/vuetify-variables.scss'
      // }
    },
    vuetifyOptions: {
      theme: {
        defaultTheme: 'light',
        themes: variableVuetify
      },
      defaults: {
        VBtn: {
          class: 'custom-btn',
          variant: 'elevated',
          color: 'primary'
        },
        VCard: {
          class: 'custom-card',
          variant: 'elevated'

        },
        VTextField: {
          class: 'custom-input',
          variant: 'outlined',
          density: 'comfortable'
        },
        VAppBar: {
          class: 'custom-app-bar'
        },
        VNavigationDrawer: {
          class: 'custom-drawer'
        },
        VDataTable: {
          class: 'custom-table'
        },
        VChip: {
          class: 'custom-chip'
        },
        VDialog: {
          class: 'custom-dialog'
        }
      }
    }
  }
})
