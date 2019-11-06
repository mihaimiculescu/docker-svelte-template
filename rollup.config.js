import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import rollup_start_dev from './rollup_start_dev';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: '/src/svelte/src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: '/src/svelte/public/bundle.js'
	},
	plugins: [
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file — better for performance
			css: css => {
				css.write('/src/svelte/public/bundle.css');
			}
		}),
		postcss(),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/rollup-plugin-commonjs
		resolve({
			browser: true,
			dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
		}),
		commonjs(),
		
		// In dev mode, call `npm run start:dev` once
		// the bundle has been generated
		!production && rollup_start_dev,

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('/src/svelte/public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false,
		chokidar:{
			paths: '../src/svelte/src',
			usePolling: true,
			interval: 1000, //increase value for larger projects
			binaryInterval: 3000, //increase value for larger projects
		}
	}
};
