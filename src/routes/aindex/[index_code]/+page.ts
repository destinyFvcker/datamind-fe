import type { PageLoad } from './$types.js';

export const load: PageLoad = ({ params }) => {
	const { index_code } = params;

	return {
		indexCode: index_code
	};
};
