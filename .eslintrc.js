module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    "project": "./tsconfig.json",
  },
  env: {
    browser: true,
  },
  plugins: [
    'prettier',
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint'
  ],

  // 0 = off, 1 = warn, 2 = error
  rules: {
    // typescript
    '@typescript-eslint/interface-name-prefix': ['error', 'always'],
    '@typescript-eslint/explicit-member-accessibility': 'off', // private fields are coming to native JS classes

    // docs
    "require-jsdoc": 'off',

    // handled by prettier
    'prettier/prettier': 'error',
  },
  overrides: [
    // tests
    {
      files: [
        'tests/**',
      ],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
      }
    },
    // type definitions
    {
      files: [
        'types/**/*.ts'
      ],
      rules: {},
    }
  ]
};
