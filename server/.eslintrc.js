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
   plugins: ["sort-imports-requires"],
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
      /* Требует или запрещает заключительные запятые */
      "comma-dangle": ["warn", "always-multiline"],
      /* Максимальнаяы длина строки */
      "max-len": [
         "warn",
         {
            code: 150,
            ignoreUrls: true,
            ignorePattern: "import",
         },
      ],
      /* Вставляет пустую строку в конце файла */
      "eol-last": ["warn", "always"],
      "object-curly-spacing": ["warn", "always"],
      "no-useless-escape": "off",
      "sort-imports-requires/sort-imports": "error",
      "sort-imports-requires/sort-requires": "error",
   },
};
