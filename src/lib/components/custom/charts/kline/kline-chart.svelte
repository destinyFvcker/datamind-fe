<script lang="ts">
	import {
		TitleComponent,
		GraphicComponent,
		TooltipComponent,
		GridComponent,
		LegendComponent,
		DataZoomComponent
	} from 'echarts/components';
	import { BarChart, CandlestickChart, LineChart } from 'echarts/charts';
	import { UniversalTransition } from 'echarts/features';
	import { CanvasRenderer } from 'echarts/renderers';
	import { chartable } from '$lib/utils/echart';
	import type { KlineDataSet, StockDailyKlineData } from './data';
	import { getOptions } from './chart-def';
	import { mode } from 'mode-watcher';

	const ext = [
		TitleComponent,
		GraphicComponent,
		TooltipComponent,
		GridComponent,
		LegendComponent,
		DataZoomComponent,
		BarChart,
		CandlestickChart,
		LineChart,
		CanvasRenderer,
		UniversalTransition
	];

	let {
		dataSet = $bindable()
	}: {
		dataSet: KlineDataSet;
	} = $props();

	const options = $derived.by(() => {
		// const dataMA5 = dataSet.dataMA5?.flat;

		return getOptions(
			dataSet.dates,
			dataSet.volumes,
			dataSet.klineDatas,
			dataSet.dataMA5,
			dataSet.dataMA10,
			dataSet.dataMA20
		);
	});
</script>

<div class="mb-2 flex h-96 w-auto items-center">
	<div class="h-full w-full" use:chartable={{ options: options, ext, theme: mode.current }}></div>
</div>
