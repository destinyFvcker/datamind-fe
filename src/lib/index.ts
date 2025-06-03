// place files you want to import through the `$lib` alias in this folder.

import { getCozeAccessToken } from './api/coze';
import { getBasicUserInfo } from './api/manage';
import { cozeAgent } from './coze';
import { globalStatus } from './global.svelte';
import { LocalStorageUtil } from './utils/storage';

export interface JwtStoreSchema {
	jwt: string;
}
export const jwtLocalStorageKey = 'datamind-jwt';
export const jwtStorage = new LocalStorageUtil<JwtStoreSchema>(jwtLocalStorageKey);

export async function initApp() {
	const res = await getBasicUserInfo();
	const accessTokenRes = await getCozeAccessToken();

	if (res && accessTokenRes) {
		globalStatus.userInfo = res.data;
		cozeAgent.refresh({
			id: res.data.id,
			nickname: res.data.nickname,
			avartar_url: res.data.avatar_url,
			token: accessTokenRes.data
		});
		globalStatus.isNavShow = true;
	}
}
