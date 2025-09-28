export const env = {
  local: {
    NODE_ENV: 'local',
    BASE_URL: 'http://localhost:3000',
    API_BASE: 'https://user-api-dev.leis.studio/api/v1',
    NUXT_PUBLIC_BASE_URL: 'http://localhost:3000',
    NUXT_PUBLIC_ENVIRONMENT: 'local'
  },
  dev: {
    NODE_ENV: 'dev',
    API_BASE: 'https://user-api-dev.leis.studio/api/v1',
    NUXT_PUBLIC_BASE_URL: 'http://localhost:3000',
    NUXT_PUBLIC_ENVIRONMENT: 'dev'

  },
  prod: {
    NODE_ENV: 'prod',
    API_BASE: 'https://user-api-dev.leis.studio/api/v1',
    NUXT_PUBLIC_BASE_URL: 'https://your-production-domain.vercel.app',
    NUXT_PUBLIC_ENVIRONMENT: 'prod'
  }
}
