module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'react-hooks'],
  extends: [
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] }
    ],
    'react/prop-types': 0,
    'import/extensions': 0,
    'no-param-reassign': 0,
    'consistent-return': 0,
    'import/no-unresolved': 0,
    'no-underscore-dangle': 0,
    'array-callback-return': 0,
    'react/forbid-prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'react/no-array-index-key': 0,
    'react/no-unescaped-entities': 0,
    'react-hooks/exhaustive-deps': 0,
    'react/jsx-props-no-spreading': 0,
    'import/prefer-default-export': 0,
    '@typescript-eslint/no-var-requires': 0,
    'jsx-a11y/label-has-associated-control': 0
  }
}
