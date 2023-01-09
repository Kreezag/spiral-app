module.exports = {
  root: true,
  extends: ["@nuxt/eslint-config"],
  rules: {
    'vue/no-reserved-component-names': 'off', // NOTE: need to enable
    'vue/require-explicit-emits': 'off', // NOTE: need to enable
    'vue/multi-word-component-names': 'off', // NOTE: need to enable
  }
};
