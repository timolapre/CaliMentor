module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier', '@typescript-eslint'],
  // add your custom rules here
  rules: {
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'prefer-promise-reject-errors': 'off',
    'no-process-env': 'off',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'max-classes-per-file': 'off',
    'consistent-return': 'off',
    'spaced-comment': 'off',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    "vue/attribute-hyphenation": "never"
  },
}
