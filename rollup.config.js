import svelte from 'rollup-plugin-svelte';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';

const config = {
  input: 'src/content.js',
  output: {
    file: 'dist/content.js',
    format: 'iife'
  },
  plugins: [
    svelte({
      dev: true
    }),
    babel({
      babelHelpers: 'bundled'
    }),
    resolve({
			browser: true,
			dedupe: ['svelte'],
			preferBuiltins: true,
		}),
		commonjs(),
		globals(),
		builtins()
  ]
};

export default config;