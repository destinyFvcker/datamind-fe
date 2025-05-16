import type { EChartsOption } from 'echarts';
import type { StockDailyKlineData } from './data';

export const getOptions = (
	dates: string[],
	volumes: number[],
	klineDatas: StockDailyKlineData[],
	dataMA5: (number | null | undefined)[],
	dataMA10: (number | null | undefined)[],
	dataMA20: (number | null | undefined)[]
): EChartsOption => ({
	legend: {
		top: 10,
		left: 'center',
		data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
	},
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'cross'
		},
		backgroundColor: 'rgba(255, 255, 255, 0.8)',
		textStyle: {
			fontSize: 12,
			color: '#333'
		},
		position: function (pos, params, el, elRect, size) {
			const obj: Record<string, number> = {
				top: 60
			};
			obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)] ?? 'right'] = 30;
			return obj;
		},
		extraCssText: 'width: 170px'
	},
	axisPointer: {
		link: [
			{
				xAxisIndex: [0, 1]
			}
		],
		label: {
			backgroundColor: '#777'
		}
	},
	toolbox: {
		feature: {
			dataZoom: {
				yAxisIndex: false
			},
			brush: {
				type: ['lineX', 'clear']
			}
		}
	},
	brush: {
		xAxisIndex: 'all',
		brushLink: 'all',
		outOfBrush: {
			colorAlpha: 0.1
		}
	},
	grid: [
		{
			left: 50,
			right: 50,
			height: '50%',
			top: 50
			// bottom: '20%'
		},
		{
			left: 50,
			right: 50,
			bottom: '15%',
			height: '15%'
		}
	],
	xAxis: [
		{
			type: 'category',
			data: dates,
			boundaryGap: false,
			axisLine: { onZero: false },
			splitLine: { show: false },
			min: 'dataMin',
			max: 'dataMax',
			axisPointer: {
				z: 100
			}
		},
		{
			type: 'category',
			gridIndex: 1,
			data: dates,
			boundaryGap: false,
			axisLine: { onZero: false },
			axisTick: { show: false },
			splitLine: { show: false },
			axisLabel: { show: false },
			min: 'dataMin',
			max: 'dataMax'
		}
	],
	yAxis: [
		{
			scale: true,
			splitArea: {
				show: true
			}
		},
		{
			scale: true,
			gridIndex: 1,
			splitNumber: 2,
			axisLabel: { show: false },
			axisLine: { show: false },
			axisTick: { show: false },
			splitLine: { show: false }
		}
	],
	dataZoom: [
		{
			type: 'inside',
			xAxisIndex: [0, 1],
			start: 20,
			end: 100
		},
		{
			show: true,
			xAxisIndex: [0, 1],
			type: 'slider',
			start: 20,
			end: 100,
			bottom: '5%'
		}
	],
	series: [
		{
			name: '日K',
			type: 'candlestick',
			data: klineDatas.map((item: StockDailyKlineData) => ({
				value: [item.open, item.close, item.low, item.high]
			})),
			itemStyle: {
				color: '#06B800',
				color0: '#FA0000',
				borderColor: undefined,
				borderColor0: undefined
			},
			tooltip: {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				formatter: function (params: any) {
					const paramData = params[0];
					return [
						'Date: ' + paramData.name + '<hr size=1 style="margin: 3px 0">',
						'Open: ' + params.data[0] + '<br/>',
						'Close: ' + params.data[1] + '<br/>',
						'Lowest: ' + params.data[2] + '<br/>',
						'Highest: ' + params.data[3] + '<br/>'
					].join('');
				}
			}
		},
		{
			name: 'MA5',
			type: 'line',
			data: dataMA5,
			smooth: true,
			lineStyle: {
				opacity: 0.5
			}
		},
		{
			name: 'MA10',
			type: 'line',
			data: dataMA10,
			smooth: true,
			lineStyle: {
				opacity: 0.5
			}
		},
		{
			name: 'MA20',
			type: 'line',
			data: dataMA20,
			smooth: true,
			lineStyle: {
				opacity: 0.5
			}
		},
		{
			name: 'Volumn',
			type: 'bar',
			xAxisIndex: 1,
			yAxisIndex: 1,
			data: volumes
		}
	]
});
