<script lang="ts" generics="T extends RowData">
	import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-svelte';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { type RowData, type Table } from '@tanstack/table-core';

	// 关于如何给props标注类型仍然需要学习
	let { tableModel = $bindable() }: { tableModel: Table<T> } = $props();
	let itemPerPage = $state('50');
	let pageIndex = $derived(tableModel.getState().pagination.pageIndex);
	let pageCount = $derived(tableModel.getPageCount());
	let hasNextPage = $derived(tableModel.getCanNextPage());
	let hasPreviousPage = $derived(tableModel.getCanPreviousPage());
</script>

<div class="flex items-center justify-between px-2">
	<!-- <span class="font-bold">📖使用分页:</span> -->
	<span> </span>
	<div class="flex items-center space-x-6 lg:space-x-8">
		<div class="flex items-center space-x-2">
			<p class="text-sm font-medium">Rows per page</p>
			<Select.Root
				type="single"
				onValueChange={(selected) => {
					tableModel.setPageSize(Number(selected));
				}}
				bind:value={itemPerPage}
			>
				<Select.Trigger class="h-8 w-[70px]"
					>{itemPerPage ? itemPerPage : '选择分页时每页要显示条目的数量'}</Select.Trigger
				>
				<Select.Content>
					<Select.Item value="100">100</Select.Item>
					<Select.Item value="200">200</Select.Item>
					<Select.Item value="300">300</Select.Item>
					<Select.Item value="400">400</Select.Item>
					<Select.Item value="500">500</Select.Item>
				</Select.Content>
			</Select.Root>
		</div>
		<div class="flex w-[100px] items-center justify-center text-sm font-medium">
			Page {pageIndex + 1} of {pageCount}
		</div>
		<div class="flex items-center space-x-2">
			<Button
				variant="outline"
				class="hidden h-8 w-8 p-0 lg:flex"
				onclick={() => tableModel.firstPage()}
				disabled={!hasPreviousPage}
			>
				<span class="sr-only">Go to first page</span>
				<ChevronsLeft size={15} />
			</Button>
			<Button
				variant="outline"
				class="h-8 w-8 p-0"
				onclick={() => tableModel.previousPage()}
				disabled={!hasPreviousPage}
			>
				<span class="sr-only">Go to previous page</span>
				<ChevronLeft size={15} />
			</Button>
			<Button
				variant="outline"
				class="h-8 w-8 p-0"
				onclick={() => tableModel.nextPage()}
				disabled={!hasNextPage}
			>
				<span class="sr-only">Go to next page</span>
				<ChevronRight size={15} />
			</Button>
			<Button
				variant="outline"
				class="hidden h-8 w-8 p-0 lg:flex"
				onclick={() => tableModel.lastPage()}
				disabled={!hasNextPage}
			>
				<span class="sr-only">Go to last page</span>
				<ChevronsRight size={15} />
			</Button>
		</div>
	</div>
</div>
