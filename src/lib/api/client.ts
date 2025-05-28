import createClient, { type Middleware } from 'openapi-fetch';
import type { paths } from './schema';
import { dev } from '$app/environment';
import { goto } from '$app/navigation';
import { jwtStorage } from '$lib';
import { base } from '$app/paths';

const authMiddleware: Middleware = {
	async onRequest({ request }) {
		const store = jwtStorage.getData();
		if (store)
			// set "Authorization" header
			request.headers.set('Authorization', `${store.jwt}`);
		return request;
	},
	async onResponse({ response }) {
		switch (response.status) {
			case 401 | 403 | 400:
				goto(`${base}/error/401`);
				jwtStorage.removeData(); // 防止循环跳转
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
