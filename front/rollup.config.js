import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';

const production = !process.env.ROLLUP_WATCH;
const BACKEND_URL = production
  ? 'https://proxima-backend.herokuapp.com/api/v1'
  : 'http://localhost:3000/api/v1';

const DOMAIN_URL = production ? 'https://proxima-iota.vercel.app' : 'http://localhost:5000';

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require('child_process').spawn(
        'npm',
        ['run', 'start', '--', '--dev'],
        {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true
        }
      );

      process.on('SIGTERM', toExit);
      process.on('exit', toExit);
    }
  };
}

export default {
  input: 'src/index.ts',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js',
    inlineDynamicImports: true
  },
  plugins: [
    svelte({
      dev: !production,
      preprocess: sveltePreprocess(),
      css: css => {
        css.write('bundle.css');
      }
    }),
    replace({
      'process.BACKEND_URL': `${BACKEND_URL}`,
      'process.DOMAIN_URL': `${DOMAIN_URL}`
    }),
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonjs(),
    typescript({ sourceMap: !production, inlineSources: !production }),
    !production && serve(),
    !production && livereload('public'),
    production && terser()
  ],
  watch: { clearScreen: false }
};
