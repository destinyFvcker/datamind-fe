<script lang="ts">
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { astockInfo } from '$lib/api/astock';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import type { AStockInfo, AstockNews } from '../(data)/data';
	import type { PageProps } from './$types';
	import { stockRecent100 } from '$lib/api/news';
	import { cn } from '$lib/utils';
	import Icon from '@iconify/svelte';
	import { mode } from 'mode-watcher';

	let { data }: PageProps = $props();

	let stockInfo: AStockInfo | undefined = $state();
	let stockNews: AstockNews[] = $state([]);

	let isLoading = $state(false);
	const fetchPageData = async () => {
		isLoading = true;
		const infoRes = await astockInfo(data.stockCode);
		stockInfo = infoRes?.data;

		const newsRes = await stockRecent100(data.stockCode);
		stockNews = newsRes?.data ?? [];

		if (stockInfo && stockNews.length) {
			isLoading = false;
		}
	};
	fetchPageData();
</script>

<div class="flex h-screen w-full gap-2">
	<Card.Root class="min-w-[600px] grow">
		<Card.Header>
			<div class="flex items-center">
				<div class="flex min-w-[120px] flex-col space-y-1.5">
					<Card.Title>
						{#if isLoading}
							<Skeleton class="h-[30px] w-[100px]" />
						{:else}
							{stockInfo?.stock_name}
						{/if}
					</Card.Title>
					<Card.Description>股票代码：{data.stockCode}</Card.Description>
				</div>
				<div class="min-w-[100px] grow"></div>
				<Table.Root class="rounded-sm">
					<Table.Header>
						<Table.Row class={mode.current === 'dark' ? '' : 'bg-slate-200'}>
							<Table.Head class="text-center">上市时间</Table.Head>
							<Table.Head class="text-center">行业</Table.Head>
							<Table.Head class="text-center">流通股</Table.Head>
							<Table.Head class="text-center">流通市值(元)</Table.Head>
							<Table.Head class="text-center">总市值(元)</Table.Head>
							<Table.Head class="text-center">总股本(元)</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						<Table.Row>
							{#if isLoading}
								<Table.Cell colspan={6} class="text-center">
									<Icon icon="line-md:downloading-loop" width="24" height="24" class="mx-auto" />
								</Table.Cell>
							{:else}
								<Table.Cell class="text-center">{stockInfo?.listing_date}</Table.Cell>
								<Table.Cell class="text-center">{stockInfo?.industry}</Table.Cell>
								<Table.Cell class="text-center">{stockInfo?.circulating_shares}</Table.Cell>
								<Table.Cell class="text-center">{stockInfo?.circulating_market_cap}</Table.Cell>
								<Table.Cell class="text-center">{stockInfo?.total_market_cap}</Table.Cell>
								<Table.Cell class="text-center">{stockInfo?.total_shares}</Table.Cell>
							{/if}
						</Table.Row>
					</Table.Body>
				</Table.Root>
			</div>
		</Card.Header>
		<Card.Content>
			<div class="space-y-4">
				<RadioGroup.Root
					value="option-one"
					class="flex w-fit gap-3 rounded-sm border-4 border-double border-indigo-500 px-2"
				>
					<span>数据复权: </span>
					<div class="flex items-center space-x-2">
						<RadioGroup.Item value="none" id="option-none" />
						<Label for="option-none">不复权</Label>
					</div>
					<div class="flex items-center space-x-2">
						<RadioGroup.Item value="forward" id="option-forward" />
						<Label for="option-forward">前复权</Label>
					</div>
					<div class="flex items-center space-x-2">
						<RadioGroup.Item value="backward" id="option-backward" />
						<Label for="option-backward">后复权</Label>
					</div>
				</RadioGroup.Root>
				{#if isLoading}
					{#each Array(3) as _}
						<div class="space-y-4">
							<Skeleton class="h-10 w-[550px]" />
							<Skeleton class="h-20 w-[650px]" />
							<Skeleton class="h-16 w-[500px]" />
						</div>
						<div class="h-5"></div>
					{/each}
				{:else}
					<!--  -->
				{/if}
			</div>
		</Card.Content>
	</Card.Root>

	<Card.Root class="flex min-w-[300px] max-w-[400px] flex-col">
		<Card.Header>
			<Card.Title>近日新闻</Card.Title>
			<Card.Description>关于[{data.stockCode}]的最近的100条精选新闻</Card.Description>
		</Card.Header>
		<Card.Content class="flex grow flex-col overflow-y-auto overscroll-auto">
			<div class="h-full w-full space-y-4">
				{#if isLoading}
					{#each Array(100) as _}
						<div class="flex items-center space-x-4 rounded">
							<!-- <Skeleton class="size-12 rounded-full" /> -->
							<div class="space-y-2">
								<Skeleton class="h-4 w-[350px]" />
								<Skeleton class="h-4 w-[300px]" />
							</div>
						</div>
					{/each}
				{:else}
					{#each stockNews as stockNew}
						{@render newsItem(stockNew)}
					{/each}
				{/if}
			</div>
		</Card.Content>
	</Card.Root>
</div>

{#snippet newsItem(stockNews: AstockNews)}
	<div class="flex h-fit flex-col gap-1 rounded border p-2">
		<button
			class="text-left font-bold hover:underline"
			onclick={() => {
				window.location.href = stockNews.url;
			}}>{stockNews.title}</button
		>
		<Separator orientation="horizontal" />
		<div class="flex items-center">
			<span>{stockNews.publish_time}-{stockNews.source}</span>
			<span class="grow"></span>
			<Dialog.Root>
				<Dialog.Trigger
					class={cn('!h-5 w-10 !rounded-sm px-3 py-4', buttonVariants({ variant: 'default' }))}
				>
					<span class="">摘要</span>
				</Dialog.Trigger>
				<Dialog.Content class="sm:max-w-[425px]">
					<Dialog.Header>
						<Dialog.Title>新闻摘要</Dialog.Title>
						<Dialog.Description>
							{stockNews.title}
						</Dialog.Description>
					</Dialog.Header>
					<div class="grid gap-4 py-4">
						{stockNews.content}
					</div>
				</Dialog.Content>
			</Dialog.Root>
		</div>
	</div>
{/snippet}
