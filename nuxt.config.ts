// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import variableVuetify from './assets/styles/variable/variable.vuetify'

const path = require('path')

// 获取当前环境
const { env } = require('./env')

const nodeEnv = process.env.MODE || 'local'
const mode: any = process.env.MODE ? process.env.MODE : 'dev'

export default defineNuxtConfig({
  devtools: { enabled: true },

  // 环境变量配置
  runtimeConfig: {

    // 私有键（仅在服务端可用）

    // 公共键（暴露给客户端）
    public: {
      baseURL: env[mode].BASE_URL,
      apiBase: env[mode].API_BASE,
      nodeEnv
    }
  },

  modules: ['vuetify-nuxt-module', '@pinia/nuxt', '@nuxtjs/tailwindcss', '@nuxt/image'],
  // eslint: {
  //   checker: true // <---
  // },
  alias: {
    '/@/': path.resolve('./')
  },

  nitro: {
    devProxy: {
      '/api': {
        target: 'https://user-api-dev.leis.studio/api',
        changeOrigin: true
      }
    },
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
      styles: {
        configFile: 'assets/styles/custom-vuetify.scss'
      },
      ssrClientHints: {
        reloadOnFirstRequest: false
      }
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
