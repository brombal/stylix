import json from '@rollup/plugin-json';
import ts from 'rollup-plugin-ts';

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      sourcemap: true,
    },
    plugins: [ts(), json()],
  },
];
