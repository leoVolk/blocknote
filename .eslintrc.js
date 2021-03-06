module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    "sourceType": "module"
  },
  rules: {
    "eqeqeq": "error",
    "no-console": "off",
    "no-undef": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/camelcase": "off",
    "vue/html-self-closing": "off",
    "vue/attributes-order": "off",
    "vue/order-in-components": "off",
    "vue/component-tags-order": "off",
  }
};
