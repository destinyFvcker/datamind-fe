import { stockZhIndexDailyPagn } from '$lib/api/aindex';
import { renderSnippet } from '$lib/components/ui/data-table';
import {
	createColumnHelper,
	getCoreRowModel,
	getPaginationRowModel,
	type PaginationState,
	type TableOptions
} from '@tanstack/table-core';
import { cellCenter, cellRight, cellWichSignColor, indexCellRef } from '../helper-snippets.svelte';

export const tableStatus: {
	data: IndexDailyPagin[];
	pagination: PaginationState;
	isLoading: boolean;
} = $state({
	data: [],
	pagination: { pageIndex: 0, pageSize: 100 },
	isLoading: false
});

export async function updateData() {
	tableStatus.isLoading = true;
	const res = await stockZhIndexDailyPagn();

	if (res) {
		// toast.success(res.message);
		tableStatus.data = res.data;
	}
	tableStatus.isLoading = false;
}

const columnHelper = createColumnHelper<IndexDailyPagin>();

export const defaultColumns = [
	columnHelper.accessor('code', {
		header: () => {
			return renderSnippet(cellCenter, '指数代码');
		},
		cell: (props) => {
			const code = props.getValue();
			return renderSnippet(indexCellRef, code);
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

export const options: TableOptions<IndexDailyPagin> = {
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

export interface IndexDailyPagin {
	amplitude: number;
	change_amount: number;
	change_percentage: number;
	close: number;
	code: string;
	date: string;
	high: number;
	low: number;
	open: number;
}
