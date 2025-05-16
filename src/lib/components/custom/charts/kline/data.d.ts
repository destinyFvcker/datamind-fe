export interface StockDailyKlineData {
	open: number;
	close: number;
	low: number;
	high: number;
}

export interface KlineDataSet {
	dates: string[];
	volumes: number[];
	klineDatas: StockDailyKlineData[];
	dataMA5: (number | null | undefined)[];
	dataMA10: (number | null | undefined)[];
	dataMA20: (number | null | undefined)[];
}
