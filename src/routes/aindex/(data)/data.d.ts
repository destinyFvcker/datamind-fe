export interface IndexKlineData {
	close: number;
	date: string;
	high: number;
	low: number;
	open: number;
}

export interface IndexMAData {
	date: string;
	ma10?: number | null;
	ma20?: number | null;
	ma5?: number | null;
}
