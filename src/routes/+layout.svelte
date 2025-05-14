<script lang="ts">
	import LightSwitch from '$lib/components/custom/LightSwitch.svelte';
	import { Toaster } from 'svelte-sonner';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { browser } from '$app/environment';
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
	let { children } = $props();

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});
</script>

<ModeWatcher />
<LightSwitch />
<Toaster />

<QueryClientProvider client={queryClient}>
	{@render children()}
	<SvelteQueryDevtools buttonPosition="bottom-left" />
</QueryClientProvider>
