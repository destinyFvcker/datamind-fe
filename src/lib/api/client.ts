import createClient, { type Middleware } from 'openapi-fetch';
import type { paths } from './schema';
import { dev } from '$app/environment';
import { goto } from '$app/navigation';
import { jwtStorage } from '$lib';
import { base } from '$app/paths';
import { page } from '$app/state';

const authMiddleware: Middleware = {
	async onRequest({ request }) {
		const store = jwtStorage.getData();
		if (store) {
			// set "Authorization" header
			request.headers.set('Authorization', `Bearer ${store.jwt}`);
		}
		return request;
	},
	async onResponse({ response }) {
		// console.log('status = ', response.status);
		switch (response.status) {
			case 401:
			case 403:
			case 400:
				if (
					!page.url.pathname.startsWith(`${base}/auth`) &&
					!page.url.pathname.startsWith(`${base}/user-config`)
				) {
					console.log('enter: ', page.url.pathname, base);
					goto(`${base}/error/401`);
					jwtStorage.removeData(); // 防止循环跳转
				}
				break;
			case 404:
				goto(`${base}/error/404`);
				break;
			default:
				break;
		}

		return response;
	}
};

const client = createClient<paths>({
	baseUrl: dev ? '/' : 'https://www.destinyfvcker.cn/data-mind'
});
client.use(authMiddleware);

export default client;
