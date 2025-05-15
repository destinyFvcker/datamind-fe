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
	import type { StockDailyKlineData } from './data';
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
		dates = $bindable(),
		volumes = $bindable(),
		klineDatas = $bindable(),
		dataMA5 = $bindable(),
		dataMA10 = $bindable(),
		dataMA20 = $bindable()
	}: {
		dates: string[];
		volumes: number[];
		klineDatas: StockDailyKlineData[];
		dataMA5: number[];
		dataMA10: number[];
		dataMA20: number[];
	} = $props();

	const options = $derived.by(() => {
		return getOptions(dates, volumes, klineDatas, dataMA5, dataMA10, dataMA20);
	});
</script>

<div class="mb-2 flex h-96 w-auto items-center">
	<div class="h-full w-full" use:chartable={{ options: options, ext, theme: mode }}></div>
</div>
