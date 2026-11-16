import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	css: {
		preprocessorOptions: {
			scss: {
				// Bootstrap 5.3's SCSS still uses @import and legacy color functions
				quietDeps: true,
				silenceDeprecations: [
					'import',
					'global-builtin',
					'color-functions',
				],
			},
		},
	},
});
