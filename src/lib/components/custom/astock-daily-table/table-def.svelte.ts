import { astockDailyPagin } from '$lib/api/astock';
import { renderSnippet } from '$lib/components/ui/data-table';
import {
	createColumnHelper,
	getCoreRowModel,
	getPaginationRowModel,
	type PaginationState,
	type TableOptions
} from '@tanstack/table-core';
// import { toast } from 'svelte-sonner';
import { cellCenter, cellRef, cellRight, cellWichSignColor } from '../helper-snippets.svelte';

export const tableStatus: {
	data: StockDailyPagin[];
	pagination: PaginationState;
	isLoading: boolean;
} = $state({
	data: [],
	pagination: { pageIndex: 0, pageSize: 100 },
	isLoading: false
});
export async function updateData() {
	tableStatus.isLoading = true;
	const res = await astockDailyPagin();

	if (res) {
		// toast.success(res.message);
		tableStatus.data = res.data;
	}
	tableStatus.isLoading = false;
}

const columnHelper = createColumnHelper<StockDailyPagin>();

export const defaultColumns = [
	columnHelper.accessor('code', {
		header: () => {
			return renderSnippet(cellCenter, '股票代码');
		},
		cell: (props) => {
			const code = props.getValue();
			return renderSnippet(cellRef, code);
		}
	}),
	columnHelper.accessor('date', {
		header: () => {
			return renderSnippet(cellCenter, '更新日期');
		},
		cell: (props) => {
			const updateDate = props.getValue();
			return renderSnippet(cellCenter, updateDate);
		}
	}),
	columnHelper.accessor('open', {
		header: () => {
			return renderSnippet(cellCenter, '开盘价(元)');
		},
		cell: (props) => {
			const open = props.getValue().toFixed(2);
			return renderSnippet(cellRight, open.toString());
		}
	}),
	columnHelper.accessor('close', {
		header: () => {
			return renderSnippet(cellCenter, '收盘价(元)');
		},
		cell: (props) => {
			const close = props.getValue().toFixed(2);
			return renderSnippet(cellRight, close.toString());
		}
	}),
	columnHelper.accessor('high', {
		header: () => {
			return renderSnippet(cellCenter, '最高价(元)');
		},
		cell: (props) => {
			const high = props.getValue().toFixed(2);
			return renderSnippet(cellRight, high.toString());
		}
	}),
	columnHelper.accessor('low', {
		header: () => {
			return renderSnippet(cellCenter, '最低价(元)');
		},
		cell: (props) => {
			const low = props.getValue().toFixed(2);
			return renderSnippet(cellRight, low.toString());
		}
	}),
	columnHelper.accessor('amplitude', {
		header: () => {
			return renderSnippet(cellCenter, '振幅(%)');
		},
		cell: (props) => {
			const amplitude = props.getValue().toFixed(2);
			return renderSnippet(cellRight, amplitude.toString());
		}
	}),
	columnHelper.accessor('trading_volume', {
		header: () => {
			return renderSnippet(cellCenter, '成交量(手)');
		},
		cell: (props) => {
			const trading_volume = props.getValue();
			return renderSnippet(cellRight, trading_volume.toLocaleString());
		}
	}),
	columnHelper.accessor('trading_value', {
		header: () => {
			return renderSnippet(cellCenter, '成交额(元)');
		},
		cell: (props) => {
			const trading_value = props.getValue().toFixed(2);
			return renderSnippet(cellRight, trading_value.toLocaleString());
		}
	}),
	columnHelper.accessor('turnover_rate', {
		header: () => {
			return renderSnippet(cellCenter, '换手率(%)');
		},
		cell: (props) => {
			const turnover_rate = props.getValue().toFixed(2);
			return renderSnippet(cellRight, turnover_rate.toString());
		}
	}),
	columnHelper.accessor('change_amount', {
		header: () => {
			return renderSnippet(cellCenter, '涨跌额(元)');
		},
		cell: (props) => {
			const trading_value = props.getValue();
			return renderSnippet(cellWichSignColor, trading_value);
		}
	}),
	columnHelper.accessor('change_percentage', {
		header: () => {
			return renderSnippet(cellCenter, '涨跌幅(%)');
		},
		cell: (props) => {
			const trading_percentage = props.getValue();
			return renderSnippet(cellWichSignColor, trading_percentage);
		}
	})
];

export const options: TableOptions<StockDailyPagin> = {
	get data() {
		return tableStatus.data;
	},
	state: {
		get pagination() {
			return tableStatus.pagination;
		}
	},
	columns: defaultColumns,
	onPaginationChange: (updater) => {
		if (typeof updater === 'function') {
			tableStatus.pagination = updater(tableStatus.pagination);
		} else {
			tableStatus.pagination = updater;
		}
	},
	//
	getCoreRowModel: getCoreRowModel(),
	getPaginationRowModel: getPaginationRowModel()
};

export interface StockDailyPagin {
	/**
	 * Format: double
	 * @description 振幅(%)
	 */
	amplitude: number;
	/**
	 * Format: double
	 * @description 涨跌额,注意单位(元)
	 */
	change_amount: number;
	/**
	 * Format: double
	 * @description 涨跌幅(%)
	 */
	change_percentage: number;
	/**
	 * Format: double
	 * @description 收盘价(元)
	 */
	close: number;
	/** @description 股票代码 */
	code: string;
	/**
	 * Format: date
	 * @description 最近的数据更新日期，格式为YYYY-MM-DD
	 */
	date: string;
	/**
	 * Format: double
	 * @description 最高价(元)
	 */
	high: number;
	/**
	 * Format: double
	 * @description 最低价(元)
	 */
	low: number;
	/**
	 * Format: double
	 * @description 开盘价(元)
	 */
	open: number;
	/**
	 * Format: double
	 * @description 成交额,注意单位(元)
	 */
	trading_value: number;
	/**
	 * Format: double
	 * @description 成交量,注意单位(手)
	 */
	trading_volume: number;
	/**
	 * Format: double
	 * @description 换手率(%)
	 */
	turnover_rate: number;
}
