import { toast } from 'svelte-sonner';
import client from './client';

export async function getCozeAccessToken() {
	const res = await client.GET('/api/coze/access_token');

	if (res.error) {
		toast.error(`code = ${res.error.code}, msg = ${res.error.message}`);
	}

	return res.data;
}
