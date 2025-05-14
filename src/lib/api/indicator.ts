import { toast } from 'svelte-sonner';
import client from './client';

export async function stockFinancialAbstractThs(symbolId: string, indicator: string) {
	const res = await client.GET(
		'/api/tech_indicator/stock_financial_abstract_ths/{symbol_id}/{indicator}',
		{
			params: {
				path: {
					symbol_id: symbolId,
					indicator
				}
			}
		}
	);

	if (res.error) {
		const msg = 'err code = ' + res.error.code + ', msg = ' + res.error.message;
		toast.error(msg);
	}

	return res.data;
}

export async function stockRankCxgThs(timeRange: string) {
	const res = await client.GET('/api/tech_indicator/stock_rank_cxg_ths/{time_range}', {
		params: {
			path: {
				time_range: timeRange
			}
		}
	});

	if (res.error) {
		const msg = 'err code = ' + res.error.code + ', msg = ' + res.error.message;
		toast.error(msg);
	}

	return res.data;
}

export async function stockRankCxdThs(timeRange: string) {
	const res = await client.GET('/api/tech_indicator/stock_rank_cxd_ths/{time_range}', {
		params: {
			path: {
				time_range: timeRange
			}
		}
	});

	if (res.error) {
		const msg = 'err code = ' + res.error.code + ', msg = ' + res.error.message;
		toast.error(msg);
	}

	return res.data;
}

export async function stockRankCxflThs() {
	const res = await client.GET('/api/tech_indicator/stock_rank_cxfl_ths');

	if (res.error) {
		const msg = 'err code = ' + res.error.code + ', msg = ' + res.error.message;
		toast.error(msg);
	}

	return res.data;
}

export async function stockRankCxslThs() {
	const res = await client.GET('/api/tech_indicator/stock_rank_cxsl_ths');

	if (res.error) {
		const msg = 'err code = ' + res.error.code + ', msg = ' + res.error.message;
		toast.error(msg);
	}

	return res.data;
}

export async function stockRankLxszThs(days: number) {
	const res = await client.GET('/api/tech_indicator/stock_rank_lxsz_ths/{days}', {
		params: {
			path: {
				days
			}
		}
	});

	if (res.error) {
		const msg = 'err code = ' + res.error.code + ', msg = ' + res.error.message;
		toast.error(msg);
	}

	return res.data;
}

export async function stockRankLxxdThs() {
	const res = await client.GET('/api/tech_indicator/stock_rank_lxxd_ths');

	if (res.error) {
		const msg = 'err code = ' + res.error.code + ', msg = ' + res.error.message;
		toast.error(msg);
	}

	return res.data;
}
