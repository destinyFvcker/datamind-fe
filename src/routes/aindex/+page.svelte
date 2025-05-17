<script lang="ts">
	import { AstockIndexDailyTable } from '$lib/components/custom/index-daily-table';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import { ChartNetwork, ChartNoAxesCombined } from 'lucide-svelte';
	import type { IndexKlineData, IndexMAData } from './(data)/data';
	import { indexOption50EtfKline, indexOption50EtfMas } from '$lib/api/aindex';
	import type { KlineDataSet, StockDailyKlineData } from '$lib/components/custom/charts/kline/data';
	import { KlineChartCustom } from '$lib/components/custom/charts/kline';

	let indexKlineDatas: IndexKlineData[] = $state([]);
	let indexMADatas: IndexMAData[] = $state([]);

	let klineDataSet: KlineDataSet = $derived.by(() => {
		// 	dates: string[];
		// volumes?: number[];
		// klineDatas: StockDailyKlineData[];
		// dataMA5: (number | null | undefined)[];
		// dataMA10: (number | null | undefined)[];
		// dataMA20: (number | null | undefined)[];

		const dates = indexKlineDatas.map((data) => data.date);
		const klineDatas: StockDailyKlineData[] = indexKlineDatas.map((data) => ({
			open: data.open,
			close: data.close,
			high: data.high,
			low: data.low
		}));
		const dataMA5 = indexMADatas.map((data) => data.ma5);
		const dataMA10 = indexMADatas.map((data) => data.ma10);
		const dataMA20 = indexMADatas.map((data) => data.ma20);

		return {
			dates,
			klineDatas,
			dataMA5,
			dataMA10,
			dataMA20
		};
	});

	let isChartLoading = $state(false);
	const updateQvixData = async () => {
		isChartLoading = true;
		const indexOption50EtfKlineRes = await indexOption50EtfKline(-1);
		indexKlineDatas = indexOption50EtfKlineRes?.data ?? [];

		const indexOption50EtfMasRes = await indexOption50EtfMas(-1);
		indexMADatas = indexOption50EtfMasRes?.data ?? [];

		if (indexKlineDatas.length && indexMADatas.length) {
			isChartLoading = false;
		}
	};
	updateQvixData();
</script>

<div class="space-y-2">
	<Card.Root>
		<Card.Header>
			<Card.Title class="flex gap-2">
				<ChartNoAxesCombined />
				上证50ETF波动率指数
			</Card.Title>
			<Card.Description>每日收盘后更新.</Card.Description>
		</Card.Header>
		<Card.Content>
			{#if isChartLoading}
				<div class="space-y-2">
					<Skeleton class="h-[20px] w-[60%] rounded-full" />
					<Skeleton class="h-[30px] w-[80%] rounded-full" />
					<Skeleton class="h-[10px] w-[50%] rounded-full" />
				</div>
			{:else}
				<KlineChartCustom bind:dataSet={klineDataSet} />
			{/if}
		</Card.Content>
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title class="flex gap-2">
				<ChartNetwork />
				A股指数行情(日频)
			</Card.Title>
			<Card.Description>每日收盘后更新.</Card.Description>
		</Card.Header>
		<Card.Content>
			<AstockIndexDailyTable />
		</Card.Content>
	</Card.Root>
</div>
