import { toast } from 'svelte-sonner';
import client from './client';

export async function getBasicUserInfo() {
	const res = await client.GET('/api/manage/user_info');

	if (res.error) {
		toast.error('获取用户基本信息失败……');
	}

	return res.data;
}
