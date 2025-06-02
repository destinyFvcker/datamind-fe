<script lang="ts">
	import { createSvelteTable, FlexRender } from '$lib/components/ui/data-table/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import Icon from '@iconify/svelte';
	import Paginator from '../paginator.svelte';
	import { defaultColumns, options, tableStatus, updateData } from './table-def.svelte';
	import { mode } from 'mode-watcher';
	import { cn } from '$lib/utils';

	updateData();
	const table = createSvelteTable(options);
</script>

<div class="flex h-screen flex-col space-y-2 rounded-md border p-2">
	<Paginator tableModel={table} itemName={'指数'} sortColumn={'code'} />

	<Table.Root class="relative grow overflow-auto overscroll-y-auto">
		<Table.Header>
			{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
				<Table.Row
					class={cn(
						'sticky top-0',
						mode.current == 'dark'
							? 'bg-slate-800 hover:bg-slate-800'
							: 'bg-slate-200 hover:bg-slate-200'
					)}
				>
					{#each headerGroup.headers as header (header.id)}
						<Table.Head
							class={cn(
								'',
								header.column.getCanSort()
									? 'cursor-pointer transition select-none hover:scale-110 hover:bg-slate-950 hover:text-white'
									: ''
							)}
							onclick={() => {
								if (header.column.getCanSort()) {
									header.column.toggleSorting();
								}
							}}
						>
							<div class="flex items-center justify-center gap-1">
								{#if !header.isPlaceholder}
									<FlexRender
										content={header.column.columnDef.header}
										context={header.getContext()}
									/>
								{/if}
								{#if header.column.getIsSorted().toString() === 'asc'}
									🔼
								{:else if header.column.getIsSorted().toString() === 'desc'}
									🔽
								{/if}
							</div>
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
