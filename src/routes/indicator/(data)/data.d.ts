export interface ConsecuData {
	closing_price: number;
	consecutive_change_percentage: number;
	consecutive_rising_days: number;
	cumulative_turnover_rate: number;
	highest_price: number;
	index: number;
	industry: string;
	lowest_price: number;
	stock_code: string;
	stock_name: string;
}

export interface NewHighData {
	change_percentage: number;
	index: number;
	latest_price: number;
	previous_high: number;
	previous_high_date: string;
	stock_code: string;
	stock_name: string;
	turnover_rate: number;
}

export interface NewLowData {
	change_percentage: number;
	index: number;
	latest_price: number;
	previous_low: number;
	previous_low_date: string;
	stock_code: string;
	stock_name: string;
	turnover_rate: number;
}

export interface VolumeStreakIncreaseData {
	base_day_volume: string;
	change_percentage: number;
	index: number;
	industry: string;
	latest_price: number;
	stage_change_percentage: number;
	stock_code: string;
	stock_name: string;
	volume: string;
	volume_increase_days: number;
}

export interface VolumeStreakDecreaseData {
	base_day_volume: string;
	change_percentage: number;
	index: number;
	industry: string;
	latest_price: number;
	stage_change_percentage: number;
	stock_code: string;
	stock_name: string;
	volume: string;
	volume_decrease_days: number;
}
