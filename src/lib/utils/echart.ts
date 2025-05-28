import * as echarts from 'echarts/core.js';

import type { EChartsOption } from 'echarts/types/dist/echarts.js';
export type EChartsTheme = string | object;
export type EChartsRenderer = 'canvas' | 'svg';

export type ChartOptions = {
	theme?: EChartsTheme;
	renderer?: EChartsRenderer;
	options: EChartsOption;
	ext?: Parameters<typeof echarts.use>[0];
};

const DEFAULT_OPTIONS: Partial<ChartOptions> = {
	theme: undefined,
	renderer: 'canvas'
};

export function chartable(element: HTMLElement, echartOptions: ChartOptions) {
	const { theme, renderer, options } = {
		...DEFAULT_OPTIONS,
		...echartOptions
	};
	if (echartOptions.ext) {
		echarts.use(echartOptions.ext);
	}
	let echartsInstance = echarts.init(element, theme, { renderer });
	let themeCache = theme;
	echartsInstance.setOption(options);

	function handleResize() {
		echartsInstance.resize();
	}

	window.addEventListener('resize', handleResize);

	return {
		update(newOptions: ChartOptions) {
			if (newOptions.theme != themeCache) {
				themeCache = newOptions.theme;
				echartsInstance.dispose(); // 销毁实例
				echartsInstance = echarts.init(element, themeCache, { renderer });
			}

			echartsInstance.setOption({
				...echartOptions.options,
				...newOptions.options
			});
		},
		destroy() {
			echartsInstance.dispose();
			window.removeEventListener('resize', handleResize);
		}
	};
}
