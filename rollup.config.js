import json from '@rollup/plugin-json';
import ts from '@rollup/plugin-typescript';
import { dts } from 'rollup-plugin-dts';

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      sourcemap: true,
    },
    external: ['react'],
    plugins: [json(), ts()],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts',
    },
    plugins: [dts()],
  },
];
