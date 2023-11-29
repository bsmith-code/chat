module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: ['simple-import-sort'],
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:promise/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  rules: {
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Packages `react` related packages come first.
          ['^react', '^@?\\w'],
          // Store
          ['^(store)(/.*|$)'],
          // MUI
          ['^(@mui)(/.*|$)'],
          // Context
          ['^(context)(/.*|$)'],
          // Hooks
          ['^(hooks)(/.*|$)'],
          // Components
          ['^(routers|layout|views|components)(/.*|$)'],
          // Utils
          ['^(utils)(/.*|$)'],
          // Constants
          ['^(constants)(/.*|$)'],
          // Types
          ['^(types)(/.*|$)']
        ]
      }
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'import/prefer-default-export': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-param-reassign': ['error', { props: false }],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function'
      }
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false
      }
    ],
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false
      }
    ],
    'no-underscore-dangle': 'off'
  },
  overrides: [
    {
      files: ['*.spec.js'],
      rules: {
        'no-undef': 'off'
      }
    }
  ],
  ignorePatterns: ['jest.polyfills.ts']
}
