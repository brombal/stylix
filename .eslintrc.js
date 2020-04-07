const fs = require('fs');

const rules = {
  // This is a useless warning, as mount hooks require empty arrays
  // and sometimes you just don't need to track all dependencies.
  'react-hooks/exhaustive-deps': 0,

  // Disabled in favor of TS definitions.
  'react/prop-types': 0,

  'no-empty': [
    2,
    {
      allowEmptyCatch: true,
    },
  ],

  // Turn this off in favor of unused-imports plugin.
  'no-unused-vars': 0,

  // Warn on unused imports.
  // Note that this is upgraded to an error during git commits.
  'unused-imports/no-unused-imports': 1,

  // Turn this off in favor of simple-import-sort rule.
  'sort-imports': 0,

  'simple-import-sort/sort': [
    1,
    {
      // Custom groupings based on documentation from
      // https://www.npmjs.com/package/eslint-plugin-simple-import-sort#custom-grouping
      groups: [
        // Side effect imports
        ['^\\u0000'],
        // External packages: things that start with a letter, digit, underscore, or @
        ['^@?\\w'],
        // Local packages: things that start with our top-level folder names
        [
          '^(' +
            fs
              .readdirSync('./src')
              .filter((s) => fs.statSync('./src/' + s).isDirectory())
              .join('|') +
            ')/',
        ],
        // Absolute/other imports: anything that does not start with a dot
        ['^[^.]'],
        // Relative imports: anything that starts with a dot
        ['^\\.'],
      ],
    },
  ],

  // 'debugger' statements are only warnings because we want to allow them during local development
  // Note that this is upgraded to an error during git commits.
  'no-debugger': 1,

  /** We warn about this to make you aware that require() is not recommended, but sometimes
   * needed. You should eslint-ignore any valid usages. */
  '@typescript-eslint/no-var-requires': 1,

  // The TS compiler will already error if it can't detect the return type from the code.
  // Forcing the return type is just too noisy sometimes.
  '@typescript-eslint/explicit-function-return-type': 0,

  // This is up for debate. We currently use a lot of I-prefixes so it's disabled for now.
  // https://github.com/microsoft/TypeScript-Handbook/issues/121
  '@typescript-eslint/interface-name-prefix': 0,

  // Many of our API endpoints use snake_case.
  '@typescript-eslint/camelcase': 0,

  // This rule is too restrictive. Try not to use `any` if it's avoidable, but sometimes it's
  // necessary.
  '@typescript-eslint/no-explicit-any': 0,

  // Unused vars are warnings during local development.
  // Disables eslint rule in favor of typescript-specific rule below.
  // Note that this is upgraded to an error during git commits.
  'unused-imports/no-unused-vars': 0,
  '@typescript-eslint/no-unused-vars': 1,

  'prettier/prettier': 1,
};

module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 9,
  },
  rules,
  plugins: ['simple-import-sort', 'unused-imports'],
  overrides: [
    {
      files: 'src/**/*.{ts,tsx}',
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      rules,
    },
  ],
};
