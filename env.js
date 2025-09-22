module.exports = {
  local: {
    NODE_ENV: "local",
    NUXT_PUBLIC_API_BASE: "http://localhost:3000/api",
    NUXT_PUBLIC_BASE_URL: "http://localhost:3000",
    NUXT_PUBLIC_ENVIRONMENT: "local",
  },
  dev: {
    NODE_ENV: "dev",
    NUXT_PUBLIC_API_BASE: "http://localhost:3000/api",
    NUXT_PUBLIC_BASE_URL: "http://localhost:3000",
    NUXT_PUBLIC_ENVIRONMENT: "dev",
  },
  prod: {
    NODE_ENV: "prod",
    NUXT_PUBLIC_API_BASE: "https://your-production-domain.vercel.app/api",
    NUXT_PUBLIC_BASE_URL: "https://your-production-domain.vercel.app",
    NUXT_PUBLIC_ENVIRONMENT: "prod",
  },
};
