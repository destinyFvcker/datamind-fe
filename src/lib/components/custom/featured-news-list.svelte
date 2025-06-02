<!-- 精选新闻滚动列表 -->
<script lang="ts">
	import Autoplay from 'embla-carousel-autoplay';
	import { chosenRescent100 } from '$lib/api/news';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import { cn } from '$lib/utils';

	interface NewsInfo {
		pub_time: string;
		summary: string;
		tag: string;
		url: string;
	}

	let newsInfos: NewsInfo[] = $state([]);
	let isLoading: boolean = $state(false);

	const updateData = async () => {
		isLoading = true;
		const res = await chosenRescent100();

		if (res) {
			isLoading = false;
			newsInfos = res.data;
		}
	};

	updateData();

	const plugin = Autoplay({ delay: 3000, stopOnInteraction: true, stopOnFocusIn: true });
</script>

{#snippet newsBlock(newsInfo: NewsInfo)}
	<div class="flex flex-col gap-1 rounded border p-2 md:h-[150px] lg:h-[105px]">
		<button
			class="text-left font-bold hover:underline"
			onclick={() => {
				window.location.href = newsInfo.url;
			}}
			>{newsInfo.summary.length > 15
				? `${newsInfo.summary.substring(0, 22)}...`
				: newsInfo.summary}</button
		>
		<Separator orientation="horizontal" />
		<div class="my-auto">
			<div class="flex items-center">
				<span class="text-sm">{newsInfo.pub_time}-{newsInfo.tag}</span>
				<span class="min-w-10 grow"></span>
				<Dialog.Root>
					<Dialog.Trigger
						class={cn('h-5! w-10 rounded-sm! px-3 py-4', buttonVariants({ variant: 'default' }))}
					>
						<span class="">摘要</span>
					</Dialog.Trigger>
					<Dialog.Content class="sm:max-w-[425px]">
						<Dialog.Header>
							<Dialog.Title>新闻摘要</Dialog.Title>
						</Dialog.Header>
						<div class="grid gap-4 py-4">
							{newsInfo.summary}
						</div>
					</Dialog.Content>
				</Dialog.Root>
			</div>
		</div>
	</div>
{/snippet}

{#if isLoading}
	<div class="w-full items-center space-x-4">
		<div class="space-y-2">
			<Skeleton class="h-6 w-[20%]" />
			<Skeleton class="h-4 w-[90%]" />
			<Skeleton class="h-4 w-[80%]" />
			<Skeleton class="h-4 w-[85%]" />
		</div>
	</div>
{:else}
	<Carousel.Root
		class="w-full max-w-[90%]"
		opts={{
			align: 'start',
			loop: true
		}}
		plugins={[plugin]}
		onmouseenter={plugin.stop}
		onmouseleave={() => {
			plugin.reset();
			plugin.play();
		}}
	>
		<Carousel.Content class="-ml-1">
			{#each newsInfos as newsInfo, i (i)}
				<Carousel.Item class="pl-1 lg:basis-1/3 2xl:basis-1/4">
					<div class="p-1">
						{@render newsBlock(newsInfo)}
					</div>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<Carousel.Previous />
		<Carousel.Next />
	</Carousel.Root>
{/if}
