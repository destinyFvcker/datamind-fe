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
