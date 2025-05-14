import { toast } from 'svelte-sonner';
import client from './client';

export async function getGithubState() {
	const res = await client.GET('/auths/github/state');

	if (res.error) {
		toast.error('服务端获取github state失败……，请检查网络链接');
	}

	return res.data;
}
