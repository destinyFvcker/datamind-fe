import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [sveltekit(), tailwindcss()],
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:8800',
				changeOrigin: true
			},
			'/auth': {
				target: 'http://localhost:8800',
				changeOrigin: true
			}
		}
	}
});
