/**
 * 转换数字成可读性更强的字符串
 * @param val 数值
 * @param precision 小数位数
 * @returns 千位增加逗号后的字符串
 */
export function numberFmt(val: number, precision: number | undefined = 0): string {
	if (val !== 0 && !val) return '-';
	return (+val).toFixed(precision).replace(/(\d)(?=(\d{3})+(\.|$))/g, '$1,');
}

/**
 * 转换百分数成可读性更强的字符串
 * @param val 数值
 * @param precision 小数位数
 * @returns 格式化的字符串
 */
export function percentageFmt(val: number, precision = 2): string {
	if (val !== 0 && !val) return '-';
	return `${(val * 100).toFixed(precision)}%`;
}

/**
 * 转换千分数成可读性更强的字符串
 * @param val 数值
 * @param precision 小数位数
 * @returns 格式化的字符串
 */
export function permillageFmt(val: number, precision = 2): string {
	if (val !== 0 && !val) return '-';
	return `${(val * 1000).toFixed(precision)}‰`;
}

/**
 * 转换万分数成可读性更强的字符串
 * @param val 数值
 * @param precision 小数位数
 * @returns 格式化的字符串
 */
export function permyriadFmt(val: number, precision = 2): string {
	if (val !== 0 && !val) return '-';
	return `${(val * 10000).toFixed(precision)}‱`;
}

/**
 * 转换交易所id成可读字符
 * @param ex_id 交易所id
 * @returns 交易所名称
 */
export function exId2code(ex_id: number): string {
	switch (ex_id) {
		case 3553:
			return 'SSE';
		case 3554:
			return 'SZSE';
		default:
			if (ex_id) {
				return String(ex_id);
			} else {
				return '';
			}
	}
}
/**
 * 转换交易所id成可读字符
 * @param exId 交易所id
 * @returns 交易所名称
 */
export function exId2str(exId: number): string {
	switch (exId) {
		case 3553:
			return '沪';
		case 3554:
			return '深';
		default:
			if (exId) {
				return String(exId);
			} else {
				return '';
			}
	}
}
/**
 * 转换买卖id成可读字符
 * @param bsFlag 买卖id
 * @returns 可读名称
 */
export function bsFlag2str(bsFlag: number): string {
	switch (bsFlag) {
		case 1:
		case 1063:
			return '买';
		case 2:
		case 1550:
			return '卖';
		default:
			if (bsFlag) {
				return String(bsFlag);
			} else {
				return '';
			}
	}
}
/**
 * 转换买卖id成颜色
 * @param bsFlag 买卖id
 * @returns 颜色
 */
export function bsFlag2color(bsFlag: number): 'green' | 'red' | undefined {
	switch (bsFlag) {
		case 1:
		case 1063:
			return 'green';
		case 2:
		case 1550:
			return 'red';
		default:
			return undefined;
	}
}
