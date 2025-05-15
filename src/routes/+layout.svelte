<script lang="ts">
	import LightSwitch from '$lib/components/custom/LightSwitch.svelte';
	import { Toaster } from 'svelte-sonner';
	import { ModeWatcher } from 'mode-watcher';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { browser } from '$app/environment';
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
	import { globalStatus } from '$lib/global.svelte';
	import { base } from '$app/paths';
	import Icon from '@iconify/svelte';
	import { ChartCandlestick, ChartNetwork, Cog, SquarePilcrow } from 'lucide-svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import '../app.css';
	import BackToTop from '$lib/components/custom/back-to-top.svelte';

	let { children } = $props();

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});

	// --- 判断目前处于哪个页面
	const isPageActive = (path: string) => {
		if (path === '/') {
			return page.url.pathname === path ? 'border-b-4 border-indigo-500 font-bold' : '';
		}
		return page.url.pathname.startsWith(path) ? 'border-b-4 border-indigo-500 font-bold' : '';
	};
</script>

<ModeWatcher />
<LightSwitch />

{#if globalStatus.isNavShow}
	<nav class="h-18 items-center justify-between border-2 py-0.5 lg:flex lg:flex-wrap lg:pr-14">
		<div class="mb-1 flex lg:mb-0">
			<div class="mr-3 flex flex-shrink-0 grow items-center gap-2">
				<Icon icon="material-symbols:mindfulness" width="50" height="50" />
				<span class="text-lg font-bold tracking-tight subpixel-antialiased">data-mind</span>
			</div>
		</div>
		<div class="block w-full flex-grow flex-wrap lg:w-auto lg:items-center">
			<div class="mx-2 flex items-center gap-3 text-sm lg:flex-grow">
				<Separator orientation="vertical" class="h-8 w-0.5" />
				<button
					onclick={() => goto(`${base}/`)}
					class="flex items-center gap-1 transition hover:scale-110 hover:font-bold {isPageActive(
						'/'
					)}"
				>
					<ChartCandlestick class="h-5 w-5" />
					A股行情
				</button>
				<Separator orientation="vertical" class="h-8 w-0.5" />

				<button
					onclick={() => {
						goto(`${base}/aindex`);
					}}
					class="flex items-center gap-1 transition hover:scale-110 hover:font-bold {isPageActive(
						'/aindex'
					)}"
				>
					<ChartNetwork class="h-5 w-5" />
					A股指数行情
				</button>
				<Separator orientation="vertical" class="h-8 w-0.5" />

				<button
					onclick={() => {
						goto(`${base}/indicator`);
					}}
					class="flex items-center gap-1 transition hover:scale-110 hover:font-bold {isPageActive(
						'/indicator'
					)}"
				>
					<SquarePilcrow class="h-5 w-5" />
					技术指标
				</button>
				<Separator orientation="vertical" class="h-8 w-0.5" />

				<div class="grow"></div>
				<span class="font-bold">你好, {globalStatus.userName}</span>
				<Separator orientation="vertical" class="h-8 w-0.5" />
				<button
					onclick={() => {
						goto(`${base}/user-config`);
					}}
					class="flex items-center gap-1 transition hover:scale-110 hover:font-bold {isPageActive(
						'/user-config'
					)}"
				>
					<Cog class="h-5 w-5" />
					用户设置
				</button>
			</div>
		</div>
	</nav>
{/if}

<QueryClientProvider client={queryClient}>
	<div class="min-h-screen w-full p-2">
		{@render children()}
	</div>
	<SvelteQueryDevtools buttonPosition="bottom-left" />
</QueryClientProvider>

<BackToTop />
<Toaster />
