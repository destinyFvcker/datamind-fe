import createClient, { type Middleware } from 'openapi-fetch';
import type { paths } from './schema';
import { dev } from '$app/environment';

const authMiddleware: Middleware = {
	async onRequest({ request }) {
		// set "foo" header
		request.headers.set('foo', 'bar');
		return request;
	}
};

const client = createClient<paths>({
	baseUrl: dev ? '/' : 'https://www.destinyfvcker.cn/data-mind'
});
client.use(authMiddleware);

export default client;
