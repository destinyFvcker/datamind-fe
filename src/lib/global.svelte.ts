// 全局状态管理
export interface GlobalStatus {
	isNavShow: boolean;
	userName: string;
	email: string;
}

export const globalStatus: GlobalStatus = $state({
	isNavShow: true,
	userName: '未知用户',
	email: 'example@test.com'
});
