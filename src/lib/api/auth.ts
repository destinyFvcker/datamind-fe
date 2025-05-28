import { toast } from 'svelte-sonner';
import client from './client';
import { jwtStorage } from '$lib';
import { goto } from '$app/navigation';
import { base } from '$app/paths';

export async function getGithubState() {
	const res = await client.GET('/auths/github/state');

	if (res.error) {
		toast.error('服务端获取github state失败……，请检查网络链接');
	}

	return res.data;
}

export async function signUp(email: string, password: string) {
	const res = await client.POST('/auths/plain_auth/signup', {
		body: {
			email,
			password
		}
	});

	if (res.error) {
		toast.error(`code: ${res.error.code}, ${res.error.message}`);
	}

	return res.data;
}

export async function signIn(email: string, password: string) {
	const res = await client.POST('/auths/plain_auth/signin', {
		body: {
			email,
			password
		}
	});

	if (res.error) {
		toast.error(`code: ${res.error.code}, ${res.error.message}`);
		return;
	}

	const jwt = res.response.headers.get('Authorization')!;
	jwtStorage.saveData({ jwt });
	goto(`${base}/`);

	return res.data;
}
