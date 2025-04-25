import createClient from 'openapi-fetch';
import type { paths } from './schema';
import { dev } from '$app/environment';

const client = createClient<paths>({ baseUrl: dev ? '' : '' });

// const myMiddleware: Middleware = {
// 	async onRequest({ request, options }) {
// 		// set "foo" header
// 		request.headers.set('foo', 'bar');
// 		return request;
// 	},
// 	async onResponse({ request, response, options }) {
// 		const { body, ...resOptions } = response;
// 		// change status of response
// 		return new Response(body, { ...resOptions, status: 200 });
// 	},
// 	async onError({ error }) {
// 		// wrap errors thrown by fetch
// 		// onError({ error }) {
// 		return new Error('Oops, fetch failed', { cause: error });
// 		// },
// 	}
// };

export default client;
