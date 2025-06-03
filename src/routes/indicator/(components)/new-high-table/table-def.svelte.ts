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
import type { NewHighData } from '../../(data)/data';
import { stockRankCxgThs } from '$lib/api/indicator';
import { renderSnippet } from '$lib/components/ui/data-table';
import {
	cellCenter,
	cellRight,
	cellWichSignColor,
	stockCellRef
} from '$lib/components/custom/helper-snippets.svelte';

export const tableStatus: {
	data: NewHighData[];
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

export async function updateData(timeRange: '创月新高' | '半年新高' | '一年新高' | '历史新高') {
	tableStatus.isLoading = true;
	tableStatus.data = [];

	const res = await stockRankCxgThs(timeRange);
	if (res) {
		tableStatus.data = res.data;
	}

	if (tableStatus.data.length) {
		tableStatus.isLoading = false;
	}
}

const columnHelper = createColumnHelper<NewHighData>();

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
	columnHelper.accessor('latest_price', {
		header: () => {
			return renderSnippet(cellCenter, '最新价');
		},
		cell: (props) => {
			const value = props.getValue().toString();
			return renderSnippet(cellRight, value);
		}
	}),
	columnHelper.accessor('previous_high', {
		header: () => {
			return renderSnippet(cellCenter, '前期高点');
		},
		cell: (props) => {
			const value = props.getValue().toString();
			return renderSnippet(cellRight, value);
		}
	}),
	columnHelper.accessor('previous_high_date', {
		header: () => {
			return renderSnippet(cellCenter, '前期高点日期');
		},
		cell: (props) => {
			const value = props.getValue().toString();
			return renderSnippet(cellRight, value.split('T')[0]);
		},
		enableSorting: false
	}),
	columnHelper.accessor('turnover_rate', {
		header: () => {
			return renderSnippet(cellCenter, '换手率(%)');
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
	})
];

export const options: TableOptions<NewHighData> = {
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
