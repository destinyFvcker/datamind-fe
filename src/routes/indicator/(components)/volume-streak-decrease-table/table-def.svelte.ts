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
import { stockRankCxslThs } from '$lib/api/indicator';
import { renderSnippet } from '$lib/components/ui/data-table';
import {
	cellCenter,
	cellRight,
	cellWichSignColor,
	stockCellRef
} from '$lib/components/custom/helper-snippets.svelte';
import type { VolumeStreakDecreaseData } from '../../(data)/data';

export const tableStatus: {
	data: VolumeStreakDecreaseData[];
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

export async function updateData() {
	tableStatus.isLoading = true;
	tableStatus.data = [];

	const res = await stockRankCxslThs();
	if (res) {
		tableStatus.data = res.data;
	}

	if (tableStatus.data.length) {
		tableStatus.isLoading = false;
	}
}

const columnHelper = createColumnHelper<VolumeStreakDecreaseData>();

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
			return renderSnippet(cellCenter, '股票简称');
		},
		cell: (props) => {
			const stockName = props.getValue();
			return renderSnippet(cellCenter, stockName);
		},
		enableSorting: false
	}),
	columnHelper.accessor('volume_decrease_days', {
		header: () => {
			return renderSnippet(cellCenter, '缩量天数');
		},
		cell: (props) => {
			const value = props.getValue().toString();
			return renderSnippet(cellRight, value);
		}
	}),
	columnHelper.accessor('latest_price', {
		header: () => {
			return renderSnippet(cellCenter, '最新价(元)');
		},
		cell: (props) => {
			const value = props.getValue().toString();
			return renderSnippet(cellRight, value);
		}
	}),
	columnHelper.accessor('volume', {
		header: () => {
			return renderSnippet(cellCenter, '成交量');
		},
		cell: (props) => {
			const value = props.getValue().toString();
			return renderSnippet(cellRight, value);
		}
	}),
	columnHelper.accessor('base_day_volume', {
		header: () => {
			return renderSnippet(cellCenter, '基准日成交量');
		},
		cell: (props) => {
			const value = props.getValue().toString();
			return renderSnippet(cellRight, value);
		}
	}),
	columnHelper.accessor('change_percentage', {
		header: () => {
			return renderSnippet(cellCenter, '涨跌幅(%)');
		},
		cell: (props) => {
			const value = props.getValue();
			return renderSnippet(cellWichSignColor, value);
		}
	}),
	columnHelper.accessor('stage_change_percentage', {
		header: () => {
			return renderSnippet(cellCenter, '阶段涨跌幅(%)');
		},
		cell: (props) => {
			const value = props.getValue();
			return renderSnippet(cellWichSignColor, value);
		}
	})
];

export const options: TableOptions<VolumeStreakDecreaseData> = {
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
