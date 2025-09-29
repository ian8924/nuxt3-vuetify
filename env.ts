export const env = {
  local: {
    NODE_ENV: 'local',
    BASE_URL: 'http://localhost:3000',
    API_BASE: '/api' // proxy 代理 => 'https://user-api-dev.leis.studio/api' (nuxt.config.ts 內設定)
  },
  dev: {
    NODE_ENV: 'dev',
    BASE_URL: 'http://localhost:3000',
    API_BASE: 'https://user-api-dev.leis.studio/api'

  },
  prod: {
    NODE_ENV: 'prod',
    BASE_URL: 'https://nuxt3-vuetify.vercel.app',
    API_BASE: 'https://user-api-dev.leis.studio/api'
  }
}
