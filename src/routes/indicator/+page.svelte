<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Resizable from '$lib/components/ui/resizable/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { ChartSpline, RollerCoaster, TrendingUpDown } from 'lucide-svelte';
	import { ConsecuTable, updateConsecuData } from './(components)/consecu-table';
	import { NewHighTable, updateNewHighData } from './(components)/new-high-table';
	import { NewLowTable, updateNewLowData } from './(components)/new-low-table';

	interface selectItem {
		value: string;
		label: string;
	}

	let consecuSelectValue: 'lxsz' | 'lxxd' = $state('lxsz');
	let newHighLowSelectValue: 'low' | 'high' = $state('high');
	let newHighSelectValue: '创月新高' | '半年新高' | '一年新高' | '历史新高' = $state('创月新高');
	let newLowSelectValue: '创月新低' | '半年新低' | '一年新低' | '历史新低' = $state('创月新低');

	const consecuTrends: selectItem[] = [
		{ value: 'lxsz', label: '连续上涨📈' },
		{ value: 'lxxd', label: '连续下跌📉' }
	];
	const newHighLowSelect: selectItem[] = [
		{ value: 'high', label: '创新高' },
		{ value: 'low', label: '创新低' }
	];
	const newHighRanges: selectItem[] = [
		{ value: '创月新高', label: '创月新高' },
		{ value: '半年新高', label: '半年新高' },
		{ value: '一年新高', label: '一年新高' },
		{ value: '历史新高', label: '历史新高' }
	];
	const newLowRanges: selectItem[] = [
		{ value: '创月新低', label: '创月新低' },
		{ value: '半年新低', label: '半年新低' },
		{ value: '一年新低', label: '一年新低' },
		{ value: '历史新低', label: '历史新低' }
	];

	const consecuTriggerContent = $derived(
		consecuTrends.find((t) => t.value === consecuSelectValue)?.label ?? '选择一个方向……'
	);
	const newHighLowTriggerContent = $derived(
		newHighLowSelect.find((t) => t.value === newHighLowSelectValue)?.label ?? '选择一个方向……'
	);
	const newHighTriggerContent = $derived(
		newHighRanges.find((t) => t.value === newHighSelectValue)?.label ?? '选择范围……'
	);
	const newLowTriggerContent = $derived(
		newLowRanges.find((t) => t.value === newLowSelectValue)?.label ?? '选择范围……'
	);

	$effect(() => {
		updateConsecuData(consecuSelectValue);
	});
	$effect(() => {
		updateNewHighData(newHighSelectValue);
	});
	$effect(() => {
		updateNewLowData(newLowSelectValue);
	});

	const updateData = async () => {
		const consecuData = updateConsecuData(consecuSelectValue);
		await Promise.all([consecuData]);
	};
	updateData();
</script>

<div class="flex h-[200vh] w-full gap-2">
	<Resizable.PaneGroup direction="vertical">
		<Resizable.Pane defaultSize={60}>
			<div class="flex h-full items-center justify-center pb-0.5">
				<Card.Root class="h-full w-full">
					<Card.Header>
						<Card.Title class="flex h-8 items-center gap-2">
							<RollerCoaster />
							连续上涨/下跌趋势
							<Separator orientation="vertical" class="h-5" />
							<Select.Root type="single" bind:value={consecuSelectValue}>
								<Select.Trigger class="w-fit cursor-pointer">
									{consecuTriggerContent}
								</Select.Trigger>
								<Select.Content>
									{#each consecuTrends as consecuTrend}
										<Select.Item value={consecuTrend.value}>{consecuTrend.label}</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
						</Card.Title>
						<Card.Description>
							查看在最近时间段内保持连续上涨/下跌的股票信息，每日收盘后更新.
						</Card.Description>
					</Card.Header>
					<Card.Content class="flex flex-1 flex-col overflow-hidden">
						<ConsecuTable />
					</Card.Content>
				</Card.Root>
			</div>
		</Resizable.Pane>
		<Resizable.Handle withHandle />
		<Resizable.Pane defaultSize={40}>
			<Resizable.PaneGroup direction="horizontal">
				<Resizable.Pane defaultSize={40}>
					<div class="flex h-full items-center justify-center pt-0.5 pr-0.5">
						<Card.Root class="h-full w-full">
							<Card.Header>
								<Card.Title class="flex h-8 items-center gap-2">
									<TrendingUpDown />
									创新低/高
									<Separator orientation="vertical" class="h-5" />
									<Select.Root type="single" bind:value={newHighLowSelectValue}>
										<Select.Trigger class="w-fit cursor-pointer">
											{newHighLowTriggerContent}
										</Select.Trigger>
										<Select.Content>
											{#each newHighLowSelect as selectItem}
												<Select.Item value={selectItem.value}>{selectItem.label}</Select.Item>
											{/each}
										</Select.Content>
									</Select.Root>
									<Separator orientation="vertical" class="h-5" />
									{#if newHighLowSelectValue == 'high'}
										<Select.Root type="single" bind:value={newHighSelectValue}>
											<Select.Trigger class="w-fit cursor-pointer">
												{newHighTriggerContent}
											</Select.Trigger>
											<Select.Content>
												{#each newHighRanges as ranges}
													<Select.Item value={ranges.value}>{ranges.label}</Select.Item>
												{/each}
											</Select.Content>
										</Select.Root>
									{:else if newHighLowSelectValue == 'low'}
										<Select.Root type="single" bind:value={newLowSelectValue}>
											<Select.Trigger class="w-fit cursor-pointer">
												{newLowTriggerContent}
											</Select.Trigger>
											<Select.Content>
												{#each newLowRanges as ranges}
													<Select.Item value={ranges.value}>{ranges.label}</Select.Item>
												{/each}
											</Select.Content>
										</Select.Root>
									{/if}
								</Card.Title>
								<Card.Description>收盘后更新.</Card.Description>
							</Card.Header>
							<Card.Content class="flex flex-1 flex-col overflow-hidden">
								{#if newHighLowSelectValue == 'high'}
									<NewHighTable />
								{:else if newHighLowSelectValue == 'low'}
									<NewLowTable />
								{/if}
							</Card.Content>
						</Card.Root>
					</div>
				</Resizable.Pane>
				<Resizable.Handle withHandle />
				<Resizable.Pane defaultSize={60}>
					<div class="flex h-full items-center justify-center pt-0.5 pl-0.5">
						<Card.Root class="h-full w-full">
							<Card.Header>
								<Card.Title class="flex items-center gap-2">
									<ChartSpline />
									持续放/缩量
								</Card.Title>
								<Card.Description>收盘后更新.</Card.Description>
							</Card.Header>
							<Card.Content>
								<p>Card Content</p>
							</Card.Content>
						</Card.Root>
					</div>
				</Resizable.Pane>
			</Resizable.PaneGroup>
		</Resizable.Pane>
	</Resizable.PaneGroup>
</div>
