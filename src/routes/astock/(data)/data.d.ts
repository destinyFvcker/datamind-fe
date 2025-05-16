export interface AStockInfo {
	circulating_market_cap: number;
	circulating_shares: number;
	industry: string;
	latest_price: number;
	listing_date: number;
	stock_code: string;
	stock_name: string;
	total_market_cap: number;
	total_shares: number;
}

export interface AstockNews {
	content: string;
	keyword: string;
	publish_time: string;
	source: string;
	title: string;
	url: string;
}

export interface AStockKline {
	close: number;
	date: string;
	high: number;
	low: number;
	open: number;
}

export interface AStockVolume {
	date: string;
	trading_volume: number;
}

export interface AStockMA {
	date: string;
	ma10?: number | null;
	ma20?: number | null;
	ma5?: number | null;
}

export interface AStockIndicator {
	amplitude: number;
	change_amount: number;
	change_percent: number;
	date: string;
	trading_value: number;
	turnover_rate: number;
}
