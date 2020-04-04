/**
 * This eslint config is used only during git commits (via lint-staged).
 * These rules should be identical to those in .eslintrc.js, with the exception
 * of certain rules being upgraded from warnings to errors.
 */

const jsRules = {
  // Error on unused imports.
  'unused-imports/no-unused-imports': 2,

  // Error on unused vars
  'unused-imports/no-unused-vars': [2, { ignoreRestSiblings: true }],

  // Error on debugger statements
  'no-debugger': 2,

  // Error on incorrect import sort order
  'simple-import-sort/sort': 2,
};

const tsRules = {
  // Error on unused vars
  'unused-imports/no-unused-vars': 0,
  '@typescript-eslint/no-unused-vars': 2,
};

module.exports = {
  extends: './.eslintrc.js',
  rules: jsRules,
  overrides: [
    {
      files: 'src/**/*.{ts,tsx}',
      rules: {
        ...jsRules,
        ...tsRules,
      },
    },
  ],
};
