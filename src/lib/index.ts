// place files you want to import through the `$lib` alias in this folder.

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

	if (res) {
		globalStatus.userInfo = res.data;
		cozeAgent.refresh();
		globalStatus.isNavShow = true;
	}
}
