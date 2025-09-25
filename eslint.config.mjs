// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    // TypeScript and Vue support
    typescript: true,
    vue: true,

    // Disable some opinionated rules
    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: false
    },

    // Ignore files
    ignores: [
      'node_modules/',
      '.nuxt/',
      '.output/',
      'dist/',
      '*.generated.*',
      'logs/',
      '*.log',
      '.env*',
      '.DS_Store',
      'package-lock.json'
    ]
  },
  {
    // Custom rules for your project
    rules: {
      // Vue specific rules
      'vue/html-self-closing': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/max-attributes-per-line': ['error', {
        singleline: 3,
        multiline: 1
      }],

      // TypeScript rules
      '@typescript-eslint/no-explicit-any': 'off',
      'ts/no-require-imports': 'off',

      // Console and debugging
      'no-console': 'off',

      // Import rules
      'perfectionist/sort-imports': 'off',
      'node/prefer-global/process': 'off',
      'unicorn/prefer-node-protocol': 'off',

      // General formatting preferences
      'style/comma-dangle': ['error', 'never'],
      'style/brace-style': ['error', '1tbs', { allowSingleLine: true }]
    }
  }
)
