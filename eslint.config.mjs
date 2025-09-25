// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    files: ['**/*.vue'],
    rules: {
      // Vue template formatting rules
      'vue/html-indent': ['error', 2],
      'vue/html-closing-bracket-newline': ['error', {
        'singleline': 'never',
        'multiline': 'always'
      }],
      'vue/html-closing-bracket-spacing': ['error', {
        'startTag': 'never',
        'endTag': 'never',
        'selfClosingTag': 'always'
      }],
      'vue/html-end-tags': 'error',
      'vue/html-self-closing': ['error', {
        'html': {
          'void': 'never',
          'normal': 'always',
          'component': 'always'
        },
        'svg': 'always',
        'math': 'always'
      }],
      'vue/max-attributes-per-line': ['error', {
        'singleline': 3,
        'multiline': 1
      }],
      'vue/multiline-html-element-content-newline': 'error',
      'vue/mustache-interpolation-spacing': ['error', 'always'],
      'vue/no-multi-spaces': 'error',
      'vue/no-spaces-around-equal-signs-in-attribute': 'error',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/attribute-hyphenation': ['error', 'always'],
      'vue/v-bind-style': ['error', 'shorthand'],
      'vue/v-on-style': ['error', 'shorthand'],
      'vue/first-attribute-linebreak': ['error', {
        'singleline': 'ignore',
        'multiline': 'below'
      }]
    }
  },
  {
    files: ['**/*.js', '**/*.ts', '**/*.mjs'],
    rules: {
      // 基礎格式化規則
      '@typescript-eslint/no-explicit-any': 'off',
      'indent': ['error', 2, {
        'SwitchCase': 1,
        'VariableDeclarator': 1,
        'outerIIFEBody': 1,
        'MemberExpression': 1,
        'FunctionDeclaration': { 'parameters': 1, 'body': 1 },
        'FunctionExpression': { 'parameters': 1, 'body': 1 },
        'CallExpression': { 'arguments': 1 },
        'ArrayExpression': 1,
        'ObjectExpression': 1,
        'ImportDeclaration': 1,
        'flatTernaryExpressions': false,
        'ignoreComments': false
      }],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single', { 'avoidEscape': true }],
      'semi': ['error', 'never'],
      'comma-dangle': ['error', 'never'],
      'comma-spacing': ['error', { 'before': false, 'after': true }],
      'comma-style': ['error', 'last'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'computed-property-spacing': ['error', 'never'],
      'func-call-spacing': ['error', 'never'],
      'key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }],
      'keyword-spacing': ['error', { 'before': true, 'after': true }],
      'space-before-blocks': ['error', 'always'],
      'space-before-function-paren': ['error', 'always'],
      'space-in-parens': ['error', 'never'],
      'space-infix-ops': 'error',
      'space-unary-ops': ['error', { 'words': true, 'nonwords': false }],
      'spaced-comment': ['error', 'always', { 'exceptions': ['-', '+'] }],
      'arrow-spacing': ['error', { 'before': true, 'after': true }],
      'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
      'eol-last': ['error', 'always'],
      'no-trailing-spaces': 'error',
      'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
      'padded-blocks': ['error', 'never']
    }
  }
)
