import { toast } from 'svelte-sonner';
import client from './client';

export async function indexOption50EtfKline(limit: number) {
	const res = await client.GET('/api/aindex/index_option_50etf_qvix_kline', {
		params: {
			query: {
				limit
			}
		}
	});

	if (res.error) {
		const msg = 'err code = ' + res.error.code + ', msg = ' + res.error.message;
		toast.error(msg);
	}

	return res.data;
}

export async function indexOption50EtfMas(limit: number) {
	const res = await client.GET('/api/aindex/index_option_50etf_qvix_mas', {
		params: {
			query: {
				limit
			}
		}
	});

	if (res.error) {
		const msg = 'err code = ' + res.error.code + ', msg = ' + res.error.message;
		toast.error(msg);
	}

	return res.data;
}

export async function stockZhIndexDailyKline(indexCode: string, limit: number) {
	const res = await client.GET('/api/aindex/stock_zh_index_daily_kline', {
		params: {
			query: {
				index_code: indexCode,
				limit
			}
		}
	});

	if (res.error) {
		const msg = 'err code = ' + res.error.code + ', msg = ' + res.error.message;
		toast.error(msg);
	}

	return res.data;
}

export async function stockZhIndexDailyMas(indexCode: string, limit: number) {
	const res = await client.GET('/api/aindex/stock_zh_index_daily_mas', {
		params: {
			query: {
				index_code: indexCode,
				limit
			}
		}
	});

	if (res.error) {
		const msg = 'err code = ' + res.error.code + ', msg = ' + res.error.message;
		toast.error(msg);
	}

	return res.data;
}

export async function stockZhIndexDailyVolume(indexCode: string, limit: number) {
	const res = await client.GET('/api/aindex/stock_zh_index_daily_volume', {
		params: {
			query: {
				index_code: indexCode,
				limit
			}
		}
	});

	if (res.error) {
		const msg = 'err code = ' + res.error.code + ', msg = ' + res.error.message;
		toast.error(msg);
	}

	return res.data;
}

export async function stockZhIndexDailyPagn(pageIndex?: number, pageSize?: number) {
	const res = await client.GET('/api/aindex/stock_zh_index_daily_pagin', {
		params: {
			query: {
				page_index: pageIndex,
				page_size: pageSize
			}
		}
	});

	if (res.error) {
		const msg = 'err code = ' + res.error.code + ', msg = ' + res.error.message;
		toast.error(msg);
	}

	return res.data;
}
