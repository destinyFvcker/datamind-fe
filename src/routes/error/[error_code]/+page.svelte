<script lang="ts">
	import { globalStatus } from '$lib/global.svelte';
	import Error_401 from '../(components)/error-401.svelte';
	import Error_404 from '../(components)/error-404.svelte';
	import ErrorNoEmail from '../(components)/error-no-email.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	if (data.errorCode != '404') globalStatus.isNavShow = false;
</script>

{#if data.errorCode == '401'}
	<Error_401 />
{:else if data.errorCode == 'no-email'}
	<ErrorNoEmail />
{:else if data.errorCode == '404'}
	<Error_404 />
{/if}
