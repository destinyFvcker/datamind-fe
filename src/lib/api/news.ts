import { toast } from 'svelte-sonner';
import client from './client';

export async function chosenRescent100() {
	const res = await client.GET('/api/news/chosen_rescent100');

	if (res.error) {
		const msg = 'err code = ' + res.error.code + ', msg = ' + res.error.message;
		toast.error(msg);
	}

	return res.data;
}

export async function chosenWithRange(
	startTime: string,
	endTime: string,
	pageIndex: number,
	pageSize: number
) {
	const offset = (pageIndex - 1) * pageSize;
	const res = await client.GET('/api/news/chosen_with_range', {
		params: {
			query: {
				start_time: startTime,
				end_time: endTime,
				offset,
				limit: pageSize
			}
		}
	});

	if (res.error) {
		const msg = 'err code = ' + res.error.code + ', msg = ' + res.error.message;
		toast.error(msg);
	}

	return res.data;
}

export async function stockRecent100(symbolId: string) {
	const res = await client.GET('/api/news/stock_recent100/{symbol_id}', {
		params: {
			path: {
				symbol_id: symbolId
			}
		}
	});

	if (res.error) {
		const msg = 'err code = ' + res.error.code + ', msg = ' + res.error.message;
		toast.error(msg);
	}

	return res.data;
}
