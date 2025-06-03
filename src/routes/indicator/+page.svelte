<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Resizable from '$lib/components/ui/resizable/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { ChartSpline, RollerCoaster, TrendingUpDown } from 'lucide-svelte';
	import { ConsecuTable, updateConsecuData } from './(components)/consecu-table';

	let consecuSelectValue: 'lxsz' | 'lxxd' = $state('lxsz');

	const consecuTrends = [
		{ value: 'lxsz', label: '连续上涨📈' },
		{ value: 'lxxd', label: '连续下跌📉' }
	];

	const consecuTriggerContent = $derived(
		consecuTrends.find((t) => t.value === consecuSelectValue)?.label ?? '选择一个方向……'
	);

	$effect(() => {
		updateConsecuData(consecuSelectValue);
	});

	const updateData = async () => {
		const consecuData = updateConsecuData(consecuSelectValue);
		await Promise.all([consecuData]);
	};
	updateData();
</script>

<div class="flex h-screen w-full gap-2">
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
								<Card.Title class="flex items-center gap-2">
									<TrendingUpDown />
									创新低/高
								</Card.Title>
								<Card.Description>收盘后更新.</Card.Description>
							</Card.Header>
							<Card.Content>
								<p>Card Content</p>
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
