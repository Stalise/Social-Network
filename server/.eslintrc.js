module.exports = {
   env: {
      es6: true,
      node: true,
   },
   globals: {
      Atomics: "readonly",
      SharedArrayBuffer: "readonly",
   },
   parserOptions: {
      ecmaVersion: 2018,
      sourceType: "module",
   },
   rules: {
      "no-console": "warn",
      "arrow-parens": ["warn", "as-needed"],
      semi: ["warn", "always"],
      "prefer-const": [
         "warn",
         {
            destructuring: "all",
            ignoreReadBeforeAssign: false,
         },
      ],
      indent: ["error", 3],
      "comma-dangle": ["warn", "always-multiline"],
      "max-len": [
         "warn",
         {
            code: 150,
            ignoreUrls: true,
            ignorePattern: "import",
         },
      ],
      "eol-last": ["warn", "always"],
      "object-curly-spacing": ["warn", "always"],
      "no-useless-escape": "off",
   },
};
