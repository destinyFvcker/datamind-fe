<script lang="ts">
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import {
		astockDailyIndicator,
		astockDailyKline,
		astockInfo,
		astockMaWithLimit,
		astockTradingVolume
	} from '$lib/api/astock';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import type {
		AStockIndicator,
		AStockInfo,
		AStockKline,
		AStockMA,
		AstockNews,
		AStockVolume
	} from '../(data)/data';
	import type { PageProps } from './$types';
	import { stockRecent100 } from '$lib/api/news';
	import { cn } from '$lib/utils';
	import Icon from '@iconify/svelte';
	import { mode } from 'mode-watcher';
	import { KlineChartCustom, type KlineDataSet } from '$lib/components/custom/charts/kline';
	import type { AStockIndicatsDataSet } from '$lib/components/custom/charts/astock-indicats/data';
	import { AStockIndicatorsChart } from '$lib/components/custom/charts/astock-indicats';
	import { ArrowBigLeftDash } from 'lucide-svelte';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';

	let { data }: PageProps = $props();

	let stockInfo: AStockInfo | undefined = $state(); // 股票简要信息
	let stockNews: AstockNews[] = $state([]); // 个股最近100条新闻
	let adjType: '0' | '1' | '2' = $state('1'); // 是否复权
	let stockKline: AStockKline[] = $state([]); // k线数据
	let dailyVolume: AStockVolume[] = $state([]); // 交易量数据
	let dailyMA: AStockMA[] = $state([]); // 移动平均线数据
	let stockIndicator: AStockIndicator[] = $state([]); // 交易指标数据

	let klineDataSet: KlineDataSet = $derived.by(() => {
		const dates = stockKline.map((klineData) => klineData.date);
		const volumes = dailyVolume.map((volumeData) => volumeData.trading_volume);
		const klineDatas = stockKline.map((klineData) => ({
			open: klineData.open,
			close: klineData.close,
			high: klineData.high,
			low: klineData.low
		}));
		const dataMA5 = dailyMA.map((maData) => maData.ma5);
		const dataMA10 = dailyMA.map((maData) => maData.ma10);
		const dataMA20 = dailyMA.map((maData) => maData.ma20);

		return {
			dates,
			volumes,
			klineDatas,
			dataMA5,
			dataMA10,
			dataMA20
		};
	});

	let indicatorDataSet: AStockIndicatsDataSet = $derived.by(() => {
		const dates = stockIndicator.map((data) => data.date);
		const amplitudes = stockIndicator.map((data) => data.amplitude);
		const changePercents = stockIndicator.map((data) => data.change_percent);
		const turnoverRates = stockIndicator.map((data) => data.turnover_rate);

		return {
			dates,
			amplitudes,
			changePercents,
			turnoverRates
		};
	});

	let isLoading = $state(false);
	let isChartLoading = $state(false);
	const fetchChartData = async () => {
		isChartLoading = true;

		const limitDays = 90;
		const klineRes = await astockDailyKline(data.stockCode, adjType, limitDays);
		stockKline = klineRes?.data ?? [];
		const volumeRes = await astockTradingVolume(data.stockCode, adjType, limitDays);
		dailyVolume = volumeRes?.data ?? [];
		const maRes = await astockMaWithLimit(data.stockCode, limitDays);
		dailyMA = maRes?.data ?? [];

		const indicatorsRes = await astockDailyIndicator(data.stockCode, adjType, limitDays);
		stockIndicator = indicatorsRes?.data ?? [];

		if (stockKline.length && dailyVolume.length && dailyMA.length && stockIndicator.length) {
			isChartLoading = false;
		}
	};
	const fetchPageData = async () => {
		isLoading = true;
		isChartLoading = true;
		const infoRes = await astockInfo(data.stockCode);
		stockInfo = infoRes?.data;

		const newsRes = await stockRecent100(data.stockCode);
		stockNews = newsRes?.data ?? [];

		if (stockInfo && stockNews.length) {
			isLoading = false;
		}

		await fetchChartData();
	};
	fetchPageData();
</script>

<div class="flex h-screen w-full gap-2">
	<Card.Root class="flex min-w-[600px] grow flex-col">
		<Card.Header>
			<div class="flex w-full items-start overscroll-x-auto">
				<div class="flex min-w-[120px] flex-col space-y-1.5">
					<Card.Title>
						{#if isLoading}
							<Skeleton class="h-[30px] w-[100px]" />
						{:else}
							{stockInfo?.stock_name}
						{/if}
					</Card.Title>
					<Card.Description class="whitespace-nowrap">股票代码：{data.stockCode}</Card.Description>
					<Button class="flex h-6 w-16" onclick={() => goto(`${base}/`)}>
						<ArrowBigLeftDash />
						返回
					</Button>
				</div>
				<div class="min-w-[50px] grow"></div>
				<Table.Root class="min-w-[690px] rounded-sm">
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
								{#each Array(6) as _}
									<Table.Cell class="text-center">
										<Icon icon="line-md:downloading-loop" width="24" height="24" class="mx-auto" />
									</Table.Cell>
								{/each}
							{:else}
								{@const dateStr = stockInfo?.listing_date.toString()}
								<Table.Cell class="text-center"
									>{dateStr?.slice(0, 4)}-{dateStr?.slice(4, 6)}-{dateStr?.slice(6, 8)}</Table.Cell
								>
								<Table.Cell class="text-center">{stockInfo?.industry}</Table.Cell>
								<Table.Cell class="text-center"
									>{stockInfo?.circulating_shares.toLocaleString()}</Table.Cell
								>
								<Table.Cell class="text-center"
									>{stockInfo?.circulating_market_cap.toLocaleString()}</Table.Cell
								>
								<Table.Cell class="text-center"
									>{stockInfo?.total_market_cap.toLocaleString()}</Table.Cell
								>
								<Table.Cell class="text-center"
									>{stockInfo?.total_shares.toLocaleString()}</Table.Cell
								>
							{/if}
						</Table.Row>
					</Table.Body>
				</Table.Root>
			</div>
		</Card.Header>
		<Card.Content class="flex grow flex-col gap-4 overflow-y-auto">
			{#if isChartLoading}
				{#each Array(3) as _}
					<div class="space-y-4">
						<Skeleton class="h-10 w-[70%]" />
						<Skeleton class="h-20 w-[80%]" />
						<Skeleton class="h-16 w-[60%]" />
					</div>
					<div class="h-5"></div>
				{/each}
			{:else}
				<RadioGroup.Root
					bind:value={adjType}
					class={cn(
						'sticky top-0 z-40 flex w-fit gap-3 rounded-sm border-4 border-double border-indigo-500 px-2',
						mode.current == 'dark' ? 'bg-slate-950' : 'bg-white'
					)}
					onValueChange={() => {
						fetchChartData();
					}}
				>
					<span>复权选项: </span>
					<div class="flex items-center space-x-2">
						<RadioGroup.Item value="0" id="option-none" />
						<Label for="option-none">不复权</Label>
					</div>
					<div class="flex items-center space-x-2">
						<RadioGroup.Item value="1" id="option-forward" />
						<Label for="option-forward">前复权</Label>
					</div>
					<div class="flex items-center space-x-2">
						<RadioGroup.Item value="2" id="option-backward" />
						<Label for="option-backward">后复权</Label>
					</div>
				</RadioGroup.Root>

				<KlineChartCustom bind:dataSet={klineDataSet} />
				<AStockIndicatorsChart bind:dataset={indicatorDataSet} />
			{/if}
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
