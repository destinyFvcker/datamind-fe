<script lang="ts">
	import { AstockDailyTable } from '$lib/components/custom/astock-daily-table';
	import FeaturedNewsList from '$lib/components/custom/featured-news-list.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { ChartCandlestick, Newspaper } from 'lucide-svelte';
</script>

<Card.Root>
	<Card.Header>
		<Card.Title class="flex gap-2">
			<Newspaper />
			精选新闻
		</Card.Title>
		<Card.Description>每日早九点更新.</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="flex justify-center">
			<FeaturedNewsList />
		</div>
	</Card.Content>
</Card.Root>
<div class="h-2"></div>
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
