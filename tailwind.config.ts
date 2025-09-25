import tailwindVariables from './assets/styles/variable/variable.tailwind'

/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'tw-',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './views/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: tailwindVariables,
  safelist: [
    'tw-bg-primary',
    'tw-bg-primary-10',
    'tw-bg-primary-30',
    'tw-bg-primary-50',
    'tw-bg-primary-80',
    'tw-bg-leis-primary-1',
    'tw-bg-leis-primary-2',
    'tw-bg-leis-secondary-yellow',
    'tw-bg-leis-secondary-green',
    'tw-bg-leis-secondary-pink',
    'tw-bg-leis-secondary-skyblue',
    'tw-bg-on-background',
    'tw-bg-surface',
    'tw-bg-on-surface',
    'tw-bg-on-surface-80',
    'tw-bg-outline',
    'tw-bg-outline-variant'
  ]
}
