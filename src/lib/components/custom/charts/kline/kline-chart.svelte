<script lang="ts">
	import {
		TitleComponent,
		GraphicComponent,
		TooltipComponent,
		GridComponent,
		LegendComponent,
		DataZoomComponent,
		ToolboxComponent,
		BrushComponent
	} from 'echarts/components';
	import { BarChart, CandlestickChart, LineChart } from 'echarts/charts';
	import { UniversalTransition } from 'echarts/features';
	import { CanvasRenderer } from 'echarts/renderers';
	import { chartable } from '$lib/utils/echart';
	import type { KlineDataSet, StockDailyKlineData } from './data';
	import { getOptions, getOptionsWithOutVolume } from './chart-def';
	import { mode } from 'mode-watcher';
	import { cn } from '$lib/utils';

	const ext = [
		TitleComponent,
		TooltipComponent,
		ToolboxComponent,
		GraphicComponent,
		GridComponent,
		LegendComponent,
		DataZoomComponent,
		BarChart,
		BrushComponent,
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
		if (dataSet.volumes) {
			return getOptions(
				dataSet.dates,
				dataSet.volumes,
				dataSet.klineDatas,
				dataSet.dataMA5,
				dataSet.dataMA10,
				dataSet.dataMA20
			);
		} else {
			return getOptionsWithOutVolume(
				dataSet.dates,
				dataSet.klineDatas,
				dataSet.dataMA5,
				dataSet.dataMA10,
				dataSet.dataMA20
			);
		}
	});
</script>

<div>
	<div
		class={cn(
			'mb-2 flex w-auto items-center rounded-md border',
			dataSet.volumes ? 'h-[440px]' : 'h-[300px]'
		)}
	>
		<div class="h-full w-full" use:chartable={{ options: options, ext, theme: mode.current }}></div>
	</div>
	<div class="text-center text-sm">日频k线图.</div>
</div>
