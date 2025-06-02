export interface IndexKlineData {
	date: string;
	open: number;
	close: number;
	high: number;
	low: number;
	volume: number;
}

export interface QvixKlineData {
	date: string;
	open: number;
	close: number;
	high: number;
	low: number;
}

export interface IndexMAData {
	date: string;
	ma10?: number | null;
	ma20?: number | null;
	ma5?: number | null;
}

export interface IndexBasicInfo {
	display_name: string;
	index_code: string;
	publish_date: string;
}
