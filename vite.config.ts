import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/api': {
				target: 'https://www.destinyfvcker.cn/data-mind',
				changeOrigin: true
			},
			'^/auths': {
				target: 'https://www.destinyfvcker.cn/data-mind',
				changeOrigin: true
			}
		}
	}
});
