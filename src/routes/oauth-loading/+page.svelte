<script>
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { jwtStorage } from '$lib';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	let dots = $state('');

	onMount(() => {
		const interval = setInterval(() => {
			dots = dots.length >= 3 ? '' : dots + '.';
		}, 500);

		const hash = window.location.hash.substring(1); // 移除#
		const params = new URLSearchParams(hash);
		const token = params.get('token');

		if (!token) {
			goto(`${base}/error/404`);
			return;
		}

		jwtStorage.updateData({ jwt: token });
		goto(`${base}/`);

		return () => clearInterval(interval);
	});
</script>

<div class="flex min-h-screen items-center justify-center">
	<div class="text-center">
		<Icon icon="material-symbols:mindfulness" width="100" height="100" class="mx-auto ml-2" />
		<div
			class="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-gray-400 border-t-gray-600"
		></div>
		<p class="font-sans text-lg font-bold">
			验证身份中{dots}
		</p>
	</div>
</div>
