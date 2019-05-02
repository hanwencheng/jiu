module.exports = {
  extends: ['universe/web', "plugin:react/recommended"],
  parserOptions: {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    },
  },
  settings: {
    react: {
      "pragma": "React",  // Pragma to use, default to "React"
      "version": "16.8.0", // React version, default to the latest React stable release
    },
  },
  rules: {
    "react/prefer-stateless-function": [
      0, // disable
      // { "ignorePureComponents": true }
    ],
    "handle-callback-err": 0,
    "space-infix-ops": 0,
  }
};