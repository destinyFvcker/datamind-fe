<script lang="ts">
	import { indexBasicInfo, stockZhIndexDailyKline, stockZhIndexDailyMas } from '$lib/api/aindex';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import { KlineChartCustom, type KlineDataSet } from '$lib/components/custom/charts/kline';
	import type { IndexBasicInfo, IndexKlineData, IndexMAData } from '../(data)/data';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { PageProps } from './$types';
	import { ArrowBigLeftDash } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';

	let { data }: PageProps = $props();

	let isLoading = $state(false);
	let indexInfo: IndexBasicInfo | undefined = $state();
	let indexKlineData: IndexKlineData[] = $state([]);
	let indexMaData: IndexMAData[] = $state([]);

	let klineDataSet: KlineDataSet = $derived.by(() => {
		const dates = indexKlineData.map((klineData) => klineData.date);
		const volumes = indexKlineData.map((volumeData) => volumeData.volume);
		const klineDatas = indexKlineData.map((klineData) => ({
			open: klineData.open,
			close: klineData.close,
			high: klineData.high,
			low: klineData.low
		}));
		const dataMA5 = indexMaData.map((maData) => maData.ma5);
		const dataMA10 = indexMaData.map((maData) => maData.ma10);
		const dataMA20 = indexMaData.map((maData) => maData.ma20);

		return {
			dates,
			volumes,
			klineDatas,
			dataMA5,
			dataMA10,
			dataMA20
		};
	});

	const fetchChartData = async () => {
		const limitDays = 360;

		const klinePromise = stockZhIndexDailyKline(data.indexCode, limitDays);
		const maPromise = stockZhIndexDailyMas(data.indexCode, limitDays);

		let res = await Promise.all([klinePromise, maPromise]);

		indexKlineData = res[0]?.data ?? [];
		indexMaData = res[1]?.data ?? [];
	};

	const fetchPageData = async () => {
		isLoading = true;
		const infoRes = await indexBasicInfo(data.indexCode.substring(2));
		indexInfo = infoRes?.data;

		await fetchChartData();

		if (indexInfo && indexKlineData.length && indexMaData.length) {
			isLoading = false;
		}
	};

	fetchPageData();
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>
			{#if isLoading}
				<Skeleton class="h-[30px] w-[100px]" />
			{:else}
				<span class="text-2xl font-bold">
					{indexInfo?.display_name}
				</span>
			{/if}
		</Card.Title>
		<Card.Description
			>{`指数代码：${data.indexCode}-发布时间：${indexInfo?.publish_date}`}</Card.Description
		>
		<Button class="flex h-6 w-16" onclick={() => goto(`${base}/aindex`)}>
			<ArrowBigLeftDash />
			返回
		</Button>
	</Card.Header>
	<Card.Content>
		<KlineChartCustom bind:dataSet={klineDataSet} />
	</Card.Content>
</Card.Root>
