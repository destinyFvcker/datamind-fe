// 全局状态管理
export interface GlobalStatus {
	isNavShow: boolean;
	userName: string;
	email: string;
}

export const globalStatus: GlobalStatus = $state({
	isNavShow: false,
	userName: 'zilu',
	email: 'example@test.com'
});
