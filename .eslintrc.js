module.exports = {
  "extends": [
      "airbnb",
      "prettier",
      "prettier/react"
  ],
  "env": {
      "browser": true,
      "node": true
  },
  "parser": "babel-eslint",
  "rules": {
      "semi": [2, "never"],
      "array-callback-return": "off",
      "consistent-return": "off",
      "import/no-unresolved": "off",
      "react/forbid-prop-types": "off",
      "react/no-array-index-key": "off",
      "react/no-unescaped-entities": "off",
      "react/jsx-props-no-spreading": "off",
      "react/prop-types": "off",
      "jsx-a11y/label-has-associated-control": "off",
      "react/jsx-filename-extension": [
          1,
          {
              "extensions": [".js", ".jsx"]
          }
      ],
      "prettier/prettier": [
          "error",
          {
              "trailingComma": "es5",
              "singleQuote": true,
              "printWidth": 100,
              "semi": false
          }
      ]
  },
  "plugins": ["prettier"]
};
