import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';
import autoPreprocess from 'svelte-preprocess';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import html from '@rollup/plugin-html';

const isProd = !process.env.ROLLUP_WATCH;
const isDev = !isProd;

export default {
  input: 'src/main.ts',

  output: {
    sourcemap: isDev,
    format: 'iife',
    name: 'app',
    file: 'build/bundle.js',
  },

  plugins: [
    svelte({
      preprocess: autoPreprocess(),

      // Enable run-time checks when not in production
      dev: isDev,

      /**
       * Extract any component CSS out into a separate file
       * @see {@link https://github.com/sveltejs/rollup-plugin-svelte}
       */
      css: (css) => {
        css.write('bundle.css', isDev);
      },
    }),

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

    // Run local web server to serve files when not in production
    isDev && serve({ contentBase: 'build', port: 3000 }),

    // Watch the `build` directory and refresh the
    // browser on changes when not in production
    isDev && livereload(),

    /**
     * @see {@link https://github.com/terser/terser}
     */
    isProd && terser(),

    /**
     * @see {@link https://github.com/rollup/plugins/tree/master/packages/typescript}
     */
    typescript({
      sourceMap: isDev,
    }),

    html(),
  ],

  watch: {
    clearScreen: false,
  },
};
