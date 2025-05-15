<script lang="ts">
	import Error_401 from '../(components)/error-401.svelte';
	import Error_404 from '../(components)/error-404.svelte';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

{#if data.errorCode == '401'}
	<Error_401 />
{:else if data.errorCode == '404'}
	<Error_404 />
{/if}
