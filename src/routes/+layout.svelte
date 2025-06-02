<script lang="ts">
	import LightSwitch from '$lib/components/custom/LightSwitch.svelte';
	import { Toaster } from 'svelte-sonner';
	import { ModeWatcher } from 'mode-watcher';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { browser } from '$app/environment';
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { globalStatus } from '$lib/global.svelte';
	import { base } from '$app/paths';
	import Icon from '@iconify/svelte';
	import { ChartCandlestick, ChartNetwork, Cog, SquarePilcrow } from 'lucide-svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import '../app.css';
	import BackToTop from '$lib/components/custom/back-to-top.svelte';
	import { cn } from '$lib/utils';
	import { initApp, jwtStorage } from '$lib';

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
		const prefix = '/data-mind';

		if (path === '/') {
			return page.url.pathname === prefix + path ? 'border-b-4 border-indigo-500 font-bold' : '';
		}
		return page.url.pathname.startsWith(prefix + path)
			? 'border-b-4 border-indigo-500 font-bold'
			: '';
	};

	if (jwtStorage.getData()) {
		initApp();
	}
</script>

<ModeWatcher />
<LightSwitch />

{#if globalStatus.isNavShow}
	<nav class="h-fit items-center justify-between border-2 py-0.5 lg:flex lg:flex-wrap lg:pr-14">
		<div class="mb-1 flex lg:mb-0">
			<div class="mr-3 flex shrink-0 grow items-center gap-2">
				<Icon icon="material-symbols:mindfulness" width="50" height="50" />
				<span class="text-lg font-bold tracking-tight subpixel-antialiased">data-mind</span>
			</div>
		</div>
		<div class="block w-full grow flex-wrap lg:w-auto lg:items-center">
			<div class="mx-2 flex items-center gap-3 text-sm lg:grow">
				<!-- <Separator orientation="vertical" class="h-8 w-0.5" /> -->
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
					指数行情
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
				<!-- <Separator orientation="vertical" class="h-8 w-0.5" /> -->

				<div class="grow"></div>
				<span class="font-bold">你好, {globalStatus.userInfo?.nickname ?? '未知用户'}</span>
				<Avatar.Root>
					<Avatar.Image
						src={globalStatus.userInfo?.avatar_url ??
							'https://s2.loli.net/2025/05/28/5WCKgdOnqLlSMa6.jpg'}
						alt="@shadcn"
					/>
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>
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
	<div class={cn('min-h-screen w-full', globalStatus.isInAuthPage ? '' : 'p-2')}>
		{@render children()}
	</div>
	<!-- <SvelteQueryDevtools buttonPosition="bottom-left" /> -->
</QueryClientProvider>

<BackToTop />
<Toaster />
