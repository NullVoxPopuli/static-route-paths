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
    'typescript',
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typecsript-eslint'
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
    // type definitions
    {
      files: [
        'types/**/*.ts'
      ],
      rules: {},
    }
  ]
};
