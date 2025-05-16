<script lang="ts">
	import {
		TitleComponent,
		ToolboxComponent,
		TooltipComponent,
		GridComponent,
		LegendComponent
	} from 'echarts/components';
	import { LineChart } from 'echarts/charts';
	import { UniversalTransition } from 'echarts/features';
	import { CanvasRenderer } from 'echarts/renderers';
	import { chartable } from '$lib/utils/echart';
	import type { AStockIndicatsDataSet } from './data';
	import { getOptions } from './chart-def';
	import { mode } from 'mode-watcher';

	let { dataset = $bindable() }: { dataset: AStockIndicatsDataSet } = $props();

	const ext = [
		TitleComponent,
		ToolboxComponent,
		TooltipComponent,
		GridComponent,
		LegendComponent,
		LineChart,
		CanvasRenderer,
		UniversalTransition
	];

	let options = $derived.by(() => {
		return getOptions(
			dataset.dates,
			dataset.amplitudes,
			dataset.changePercents,
			dataset.turnoverRates
		);
	});
</script>

<div>
	<div class="mb-2 flex h-[340px] w-auto items-center rounded-md border">
		<div class="h-full w-full" use:chartable={{ options, ext, theme: mode.current }}></div>
	</div>
	<div class="text-center text-sm">交易指标折线图.</div>
</div>
