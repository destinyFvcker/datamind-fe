// 全局状态管理

export interface UserInfo {
	avatar_url: string;
	created_at: string;
	email: string;
	id: number;
	last_login_at?: string | null;
	mobile?: string | null;
	nickname: string;
	password_hash: string;
	updated_at: string;
}
export interface GlobalStatus {
	isNavShow: boolean;
	isInAuthPage: boolean;
	userInfo?: UserInfo;
}

export const globalStatus: GlobalStatus = $state({
	isNavShow: false,
	isInAuthPage: false
});
