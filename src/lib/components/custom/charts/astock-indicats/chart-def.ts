import type { EChartsOption } from 'echarts';

export const getOptions = (
	dates: string[],
	amplitudes: number[],
	changePercents: number[],
	turnoverRates: number[]
): EChartsOption => ({
	tooltip: {
		trigger: 'axis'
	},
	legend: {
		top: 10,
		left: 'center',
		data: ['振幅', '涨跌幅', '换手率']
	},
	grid: {
		left: '3%',
		right: '4%',
		top: 50,
		height: '60%',
		containLabel: true
	},
	toolbox: {
		feature: {
			saveAsImage: {}
		}
	},
	xAxis: {
		type: 'category',
		boundaryGap: false,
		data: dates
	},
	yAxis: {
		type: 'value',
		scale: true
	},
	dataZoom: [
		// {
		// 	type: 'inside',
		// 	xAxisIndex: [0, 1],
		// 	start: 20,
		// 	end: 100,
		// 	minSpan: 15
		// },
		{
			show: true,
			xAxisIndex: [0, 1],
			type: 'slider',
			start: 20,
			end: 100,
			bottom: '5%',
			minSpan: 15
		}
	],
	series: [
		{
			name: '振幅',
			type: 'line',
			data: amplitudes,
			smooth: true,
			lineStyle: {
				opacity: 0.5
			}
		},
		{
			name: '涨跌幅',
			type: 'line',
			data: changePercents,
			smooth: true,
			lineStyle: {
				opacity: 0.5
			}
		},
		{
			name: '换手率',
			type: 'line',
			data: turnoverRates,
			smooth: true,
			lineStyle: {
				opacity: 0.5
			}
		}
	]
});
