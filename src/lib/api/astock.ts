import { toast } from 'svelte-sonner';
import client from './client';

export async function astockInfo(stockId: string) {
	const res = await client.GET('/api/astock/stock_individual_info/{stock_id}', {
		params: {
			path: {
				stock_id: stockId
			}
		}
	});

	if (res.error) {
		const msg = 'err code = ' + res.error.code + ', msg = ' + res.error.message;
		toast.error(msg);
	}

	return res.data;
}

export async function astockDailyIndicator(
	stockId: string,
	adjType: '0' | '1' | '2',
	limitDays: number
) {
	const res = await client.GET('/api/astock/daily_indicator', {
		params: {
			query: {
				stock_id: stockId,
				adj_type: adjType,
				limit_days: limitDays
			}
		}
	});

	if (res.error) {
		const msg = 'err code = ' + res.error.code + ', msg = ' + res.error.message;
		toast.error(msg);
	}

	return res.data;
}

export async function astockDailyKline(
	stockId: string,
	adjType: '0' | '1' | '2',
	limitDays: number
) {
	const res = await client.GET('/api/astock/daily_kline', {
		params: {
			query: {
				stock_id: stockId,
				adj_type: adjType,
				limit_days: limitDays
			}
		}
	});

	if (res.error) {
		const msg = 'err code = ' + res.error.code + ', msg = ' + res.error.message;
		toast.error(msg);
	}

	return res.data;
}

export async function astockTradingVolume(
	stockId: string,
	adjType: '0' | '1' | '2',
	limitDays: number
) {
	const res = await client.GET('/api/astock/daily_trading_volume', {
		params: {
			query: {
				stock_id: stockId,
				adj_type: adjType,
				limit_days: limitDays
			}
		}
	});

	if (res.error) {
		const msg = 'err code = ' + res.error.code + ', msg = ' + res.error.message;
		toast.error(msg);
	}

	return res.data;
}

export async function astockMaWithLimit(stockId: string, limitDays: number) {
	const res = await client.GET('/api/astock/ma_with_limit', {
		params: {
			query: {
				stock_id: stockId,
				limit_days: limitDays
			}
		}
	});

	if (res.error) {
		const msg = 'err code = ' + res.error.code + ', msg = ' + res.error.message;
		toast.error(msg);
	}

	return res.data;
}
