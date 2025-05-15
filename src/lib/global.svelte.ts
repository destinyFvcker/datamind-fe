// 全局状态管理
export interface GlobalStatus {
	isNavShow: boolean;
	userName: string;
}

export const globalStatus: GlobalStatus = $state({
	isNavShow: true,
	userName: '未知用户'
});
