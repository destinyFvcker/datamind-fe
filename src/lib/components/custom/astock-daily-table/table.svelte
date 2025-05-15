<!-- 单纯用于数据展示的可定制表格，只要传入对应的一维数据格式以及对应的列定义即可 -->
<script lang="ts">
	import { createSvelteTable, FlexRender } from '$lib/components/ui/data-table/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import Icon from '@iconify/svelte';
	import Paginator from '../paginator.svelte';
	import { defaultColumns, options, tableStatus, updateData } from './table-def.svelte';

	updateData();
	const table = createSvelteTable(options);
</script>

<div class="space-y-2 rounded-md border p-2">
	<Paginator tableModel={table} />
	<Table.Root>
		<Table.Header>
			{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
				<Table.Row>
					{#each headerGroup.headers as header (header.id)}
						<Table.Head class="border">
							{#if !header.isPlaceholder}
								<FlexRender
									content={header.column.columnDef.header}
									context={header.getContext()}
								/>
							{/if}
						</Table.Head>
					{/each}
				</Table.Row>
			{/each}
		</Table.Header>
		<Table.Body>
			{#each table.getRowModel().rows as row (row.id)}
				<Table.Row data-state={row.getIsSelected() && 'selected'}>
					{#each row.getVisibleCells() as cell (cell.id)}
						<Table.Cell class="h-0 border">
							<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
						</Table.Cell>
					{/each}
				</Table.Row>
			{:else}
				<Table.Row>
					<Table.Cell colspan={defaultColumns.length} class="h-24 text-center">
						{#if tableStatus.isLoading}
							<div class="flex items-center gap-1 justify-center">
								<Icon icon="line-md:loading-twotone-loop" width="24" height="24" />
								<span>数据加载中……</span>
							</div>
						{:else}
							No results.
						{/if}
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
