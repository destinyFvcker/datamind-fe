import type { PageLoad } from './$types.js';
import { goto } from '$app/navigation';
import { globalStatus } from '$lib/global.svelte.js';
import { base } from '$app/paths';

const possibleCodes = ['401', '404'];

export const entries = () => {
	return possibleCodes.map((code) => {
		return { error_code: code };
	});
};

export const load: PageLoad = ({ params }) => {
	const errorCode = possibleCodes.find((code) => code === params.error_code);

	if (!errorCode) goto(`${base}/error/404`);

	if (errorCode == '401') {
		globalStatus.isNavShow = false;
	}

	return {
		errorCode
	};
};
