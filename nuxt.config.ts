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

  nitro: {
    preset: mode === 'prod' ? 'vercel' : undefined,
    prerender: {
      routes: ['/login']
    }
  },
  
  // CSS 配置
  css: [
    '@/assets/styles/custom-vuetify.css'
  ],
  
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
        configFile: 'assets/styles/vuetify-variables.scss'
      }
    },
    vuetifyOptions: {
      theme: {
        defaultTheme: 'light',
        themes: {
          light: {
            colors: {
              primary: '#d2f00eff',
              secondary: '#424242', 
              accent: '#82b1ff',
              error: '#ff5252',
              info: '#2196f3',
              success: '#4caf50',
              warning: '#ffc107',
              background: '#f5f5f5',
              surface: '#ffffff'
            }
          },
          dark: {
            colors: {
              primary: '#2196f3',
              secondary: '#616161',
              accent: '#82b1ff',
              error: '#ff5252', 
              info: '#2196f3',
              success: '#4caf50',
              warning: '#ffc107',
              background: '#121212',
              surface: '#1e1e1e'
            }
          }
        }
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