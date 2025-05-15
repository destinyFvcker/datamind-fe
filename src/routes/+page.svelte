<script lang="ts">
	import { AstockDailyTable } from '$lib/components/custom/astock-daily-table';
	import * as Card from '$lib/components/ui/card/index.js';
	import { ChartCandlestick } from 'lucide-svelte';
</script>

<Card.Root>
	<Card.Header>
		<Card.Title class="flex gap-2">
			<ChartCandlestick />
			A股行情(日频)
		</Card.Title>
		<Card.Description>每日收盘后更新.</Card.Description>
	</Card.Header>
	<Card.Content>
		<AstockDailyTable />
	</Card.Content>
</Card.Root>
