import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:8800',
				changeOrigin: true
			},
			'^/auths': {
				target: 'http://localhost:8800',
				changeOrigin: true
			}
		}
	}
});
