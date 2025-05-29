import { toast } from 'svelte-sonner';
import client from './client';

export async function getBasicUserInfo() {
	const res = await client.GET('/api/manage/user_info');

	if (res.error) {
		toast.error(`获取用户基本信息失败……, code = ${res.error.code}`);
	}

	return res.data;
}

export async function getUserConfigShow() {
	const res = await client.GET('/api/manage/');

	if (res.error) {
		toast.error(`获取用户可配置信息失败……, code = ${res.error.code}`);
	}

	return res.data;
}

export async function updateWebhookApi(param: { signature?: string; webhook_addr?: string }) {
	const res = await client.POST('/api/manage/update_ding', {
		body: {
			signature: param.signature,
			webhook_addr: param.webhook_addr
		}
	});

	if (res.error) {
		toast.error(`更新钉钉报警机器人🤖信息失败……, code = ${res.error.code}`);
	}

	return res.data;
}

export async function updateNickNameApi(value: string) {
	const res = await client.POST('/api/manage/update_nickname', {
		body: {
			value
		}
	});

	if (res.error) {
		toast.error(`更新用户昵称失败……, code = ${res.error.code}`);
	}

	return res.data;
}

export async function updatePasswordApi(oldPassword: string, newPassword: string) {
	const res = await client.POST('/api/manage/update_pwd', {
		body: {
			old_password: oldPassword,
			new_password: newPassword
		}
	});

	if (res.error) {
		toast.error(`更新失败……, msg = ${res.error.message}, code = ${res.error.code}`);
	}

	return res.data;
}

export async function pingRobotApi() {
	const res = await client.POST('/api/manage/ping_alarm_robot');

	if (res.error) {
		toast.error(`${res.error.message}, code = ${res.error.code}`);
	}

	return res.data;
}
