module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true }, // Added 'node' to allow Node.js globals like 'process'
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],

    // Disable prop-types validation.
    "react/prop-types": 0,

    // Allow dangling underscores for MongoDB fields like _id
    "no-underscore-dangle": ["error", { allow: ["_id"] }],

    // Disable no-unused-vars for React (like React 17+ unused imports)
    "no-unused-vars": ["warn", { varsIgnorePattern: "^React$" }],

    // Allow specific ESLint warnings to avoid interruptions
    "no-undef": "warn",
  },

  overrides: [
    {
      // Enable ESLint for both .js and .jsx files
      files: ["*.js", "*.jsx"],
    },
  ],
};
