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
      title: `樂見 App`,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: `樂見影像 - 專業影像服務平台` },

        // OpenGraph Meta Tags
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: '樂見影像 - 專業影像服務平台' },
        { property: 'og:description', content: '提供專業的影像處理、攝影服務與視覺解決方案' },
        { property: 'og:image', content: '/fav.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: '樂見影像 - 專業影像服務平台' },
        { property: 'og:url', content: 'https://nuxt3-vuetify.vercel.app' },
        { property: 'og:site_name', content: '樂見影像' },
        { property: 'og:locale', content: 'zh_TW' },

        // Twitter Card Meta Tags
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: '樂見影像 - 專業影像服務平台' },
        { name: 'twitter:description', content: '提供專業的影像處理、攝影服務與視覺解決方案' },
        { name: 'twitter:image', content: '/fav.png' },
        { name: 'twitter:image:alt', content: '樂見影像 - 專業影像服務平台' },

        // Additional SEO Meta Tags
        { name: 'author', content: '樂見影像' },
        { name: 'keywords', content: '樂見影像,影像處理,攝影服務,視覺設計,專業攝影' },
        { name: 'robots', content: 'index, follow' },
        { name: 'theme-color', content: '#565971' }
      ],
      link: [
        // Favicon 配置
        { rel: 'icon', type: 'image/x-icon', href: '/fav.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/fav.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/fav.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/fav.png' },
        { rel: 'manifest', href: '/site.webmanifest' },

        // Canonical URL
        { rel: 'canonical', href: 'https://nuxt3-vuetify.vercel.app' }
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
