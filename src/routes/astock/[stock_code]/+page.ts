import type { PageLoad } from './$types.js';

export const load: PageLoad = ({ params }) => {
	const { stock_code } = params;

	return {
		stockCode: stock_code
	};
};
