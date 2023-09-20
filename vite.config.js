import react from '@vitejs/plugin-react-swc';
import postcssNested from 'postcss-nested';
import Unocss from 'unocss/vite';
import { defineConfig } from 'vite';
import Pages from 'vite-plugin-pages';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	plugins: [
		react(),
		Pages({
			dirs: ['src/routes/'],
			extensions: ['tsx'],
			exclude: ['**/_*/**', '**/_*', '**/*.api.*', '**/*.prompt.*'],
		}),
		Unocss(),
		tsconfigPaths(),

	],
	css: {
		devSourcemap: true,
		postcss: {
			plugins: [postcssNested()],
		},
	},
	build: {
		sourcemap: true,
	},
	rollupOptions: {
		output: {
			sourcemap: true,
		},
	},
});
