/**
 * 转换时间成int表示的日期，如20231107
 * @param date 时间
 * @returns 数字
 */
export function date2int(date: string | Date): number {
	const d = new Date(date);
	const year = d.getFullYear();
	const month = d.getMonth() + 1;
	const day = d.getDate();
	return year * 10000 + month * 100 + day;
}

/**
 * 转换时间成YYYY-MM-DD格式的字符串
 * @param date strinig or Date
 * @returns 日期字符串
 */
export function date2str(date: string | Date): string {
	const d = new Date(date);
	return `${String(d.getFullYear()).padStart(4, '0')}-${String(d.getMonth() + 1).padStart(
		2,
		'0'
	)}-${String(d.getDate()).padStart(2, '0')}`;
}

/**
 *  Convert datetime to string in `YYYY-MM-DD hh:mm:ss` format
 * @param date strinig or Date
 * @returns formated string
 */
export function datetime2str(date: string | Date | number): string {
	const d = new Date(date);
	const year = String(d.getFullYear()).padStart(4, '0');
	const month = String(d.getMonth() + 1).padStart(2, '0');
	const day = String(d.getDate()).padStart(2, '0');
	const hour = String(d.getHours()).padStart(2, '0');
	const minute = String(d.getMinutes()).padStart(2, '0');
	const second = String(d.getSeconds()).padStart(2, '0');
	if (d.getTime() === 0) {
		return '';
	} else {
		return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
	}
}

/**
 *  Convert datetime to string in `hh:mm:ss` format
 * @param date strinig or Date
 * @returns formated string
 */
export function datetime2timeStr(
	date: string | Date | number,
	second: boolean = true,
	millisecond: boolean = false
): string {
	const d = new Date(date);
	if (d.getTime()) {
		const hour = String(d.getHours()).padStart(2, '0');
		const minute = String(d.getMinutes()).padStart(2, '0');
		if (!second) {
			return `${hour}:${minute}`;
		} else if (millisecond) {
			const second = String(d.getSeconds()).padStart(2, '0');
			const millisecond = String(d.getMilliseconds()).padStart(3, '0');
			return `${hour}:${minute}:${second}.${millisecond}`;
		} else {
			const second = String(d.getSeconds()).padStart(2, '0');
			return `${hour}:${minute}:${second}`;
		}
	} else {
		return '';
	}
}

/**
 *  Convert date in int to Date object
 * @param date number, ex. 20231107
 * @returns Date
 */
export function int2date(date: number): Date {
	const day = date % 100;
	const month = ((date - day) / 100) % 100;
	const year = ((date - day - month * 100) / 10000) % 10000;
	const d = new Date();
	d.setFullYear(year);
	d.setMonth(month - 1, day);
	d.setHours(0);
	d.setMinutes(0);
	d.setSeconds(0);
	return d;
}

export function renderSecs(sec: number): string {
	const sec_whole = Number((sec % 60).toFixed(0));
	const min = Math.floor((sec / 60) % 60);
	const hour = Math.floor(sec / 3600);
	return `${hour ? `${hour}时` : ''}${min}分${sec_whole}秒`;
}
/**
 *  Set hour minutes and seconds with a `Date` object
 * @param date Date
 * @param hour number
 * @param minute number
 * @param second number
 * @returns Date
 */
export function setHms(date: Date, hour: number, minute: number, second: number): Date {
	date.setHours(hour);
	date.setMinutes(minute);
	date.setSeconds(second);
	return date;
}

/**
 * 根据日期和是否上下午给出当天交易时间的起止时间戳
 * @param am boolean 是否上午
 * @param date Date
 * @returns {min: number, max:number}
 */
export function cnStockTimeRange(am: boolean, date: Date): { min: number; max: number } {
	let min, max;
	if (am) {
		min = setHms(date, 9, 30, 0).getTime();
		max = setHms(date, 11, 30, 0).getTime();
	} else {
		min = setHms(date, 13, 0, 0).getTime();
		max = setHms(date, 15, 0, 0).getTime();
	}
	return { min, max };
}
