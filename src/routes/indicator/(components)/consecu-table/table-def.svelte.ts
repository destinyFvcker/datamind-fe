import { renderSnippet } from '$lib/components/ui/data-table';
import {
	createColumnHelper,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type ColumnFiltersState,
	type PaginationState,
	type SortingState,
	type TableOptions
} from '@tanstack/table-core';
import type { ConsecuData } from '../../(data)/data';
import {
	cellCenter,
	cellRight,
	cellWichSignColor,
	stockCellRef
} from '$lib/components/custom/helper-snippets.svelte';
import { stockRankLxszThs, stockRankLxxdThs } from '$lib/api/indicator';

export const tableStatus: {
	data: ConsecuData[];
	pagination: PaginationState;
	sorting: SortingState;
	columnFilters: ColumnFiltersState;
	isLoading: boolean;
} = $state({
	data: [],
	pagination: { pageIndex: 0, pageSize: 100 },
	sorting: [],
	columnFilters: [],
	isLoading: false
});

export async function updateData(trend: 'lxsz' | 'lxxd') {
	tableStatus.isLoading = true;

	tableStatus.data = [];
	if (trend == 'lxsz') {
		const res = await stockRankLxszThs(0);
		if (res) {
			tableStatus.data = res.data;
		}
	} else if (trend == 'lxxd') {
		const res = await stockRankLxxdThs();
		if (res) {
			tableStatus.data = res.data;
		}
	}

	if (tableStatus.data.length) {
		tableStatus.isLoading = false;
	}
}

const columnHelper = createColumnHelper<ConsecuData>();

export const defaultColumns = [
	columnHelper.accessor('stock_code', {
		header: () => {
			return renderSnippet(cellCenter, '股票代码');
		},
		cell: (props) => {
			const code = props.getValue();
			return renderSnippet(stockCellRef, code);
		},
		filterFn: 'includesString'
	}),
	columnHelper.accessor('stock_name', {
		header: () => {
			return renderSnippet(cellCenter, '股票名称');
		},
		cell: (props) => {
			const stockName = props.getValue();
			return renderSnippet(cellCenter, stockName);
		},
		enableSorting: false
	}),
	columnHelper.accessor('industry', {
		header: () => {
			return renderSnippet(cellCenter, '所属行业');
		},
		cell: (props) => {
			const industry = props.getValue();
			return renderSnippet(cellCenter, industry);
		},
		enableSorting: false
	}),
	columnHelper.accessor('consecutive_rising_days', {
		header: () => {
			return renderSnippet(cellCenter, '连续天数');
		},
		cell: (props) => {
			const consecuDays = props.getValue().toString();
			return renderSnippet(cellRight, consecuDays);
		}
	}),
	columnHelper.accessor('consecutive_change_percentage', {
		header: () => {
			return renderSnippet(cellCenter, '连续涨跌幅(%)');
		},
		cell: (props) => {
			const value = props.getValue();
			return renderSnippet(cellWichSignColor, value);
		}
	}),
	columnHelper.accessor('cumulative_turnover_rate', {
		header: () => {
			return renderSnippet(cellCenter, '累计换手率(%)');
		},
		cell: (props) => {
			const value = props.getValue().toString();
			return renderSnippet(cellRight, value);
		}
	}),
	columnHelper.accessor('highest_price', {
		header: () => {
			return renderSnippet(cellCenter, '最高价(元)');
		},
		cell: (props) => {
			const value = props.getValue().toString();
			return renderSnippet(cellRight, value);
		}
	}),
	columnHelper.accessor('lowest_price', {
		header: () => {
			return renderSnippet(cellCenter, '最低价(元)');
		},
		cell: (props) => {
			const value = props.getValue().toString();
			return renderSnippet(cellRight, value);
		}
	}),
	columnHelper.accessor('closing_price', {
		header: () => {
			return renderSnippet(cellCenter, '收盘价(元)');
		},
		cell: (props) => {
			const value = props.getValue().toString();
			return renderSnippet(cellRight, value);
		}
	})
];

export const options: TableOptions<ConsecuData> = {
	get data() {
		return tableStatus.data;
	},
	state: {
		get pagination() {
			return tableStatus.pagination;
		},
		get sorting() {
			return tableStatus.sorting;
		},
		get columnFilters() {
			return tableStatus.columnFilters;
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
	onSortingChange: (updater) => {
		if (updater instanceof Function) {
			tableStatus.sorting = updater(tableStatus.sorting);
		} else {
			tableStatus.sorting = updater;
		}
	},
	onColumnFiltersChange: (updater) => {
		if (updater instanceof Function) {
			tableStatus.columnFilters = updater(tableStatus.columnFilters);
		} else {
			tableStatus.columnFilters = updater;
		}
	},
	//
	getCoreRowModel: getCoreRowModel(),
	getPaginationRowModel: getPaginationRowModel(),
	getSortedRowModel: getSortedRowModel(),
	getFilteredRowModel: getFilteredRowModel()
};
