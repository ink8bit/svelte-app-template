import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';
import autoPreprocess from 'svelte-preprocess';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.ts',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js',
  },
  plugins: [
    svelte({
      preprocess: autoPreprocess(),

      // enable run-time checks when not in production
      dev: !production,

      // extract any component CSS out into a separate file
      css: (css) => {
        css.write('bundle.css');
      },
    }),

    // consult the documentation for details:

    /**
     * External dependencies
     * @see {@link https://github.com/rollup/plugins/tree/master/packages/node-resolve}
     */
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
    /**
     * @see {@link https://github.com/rollup/plugins/tree/master/packages/commonjs}
     */
    commonjs(),

    production && terser(),

    typescript(),
  ],
  watch: {
    clearScreen: false,
  },
};
