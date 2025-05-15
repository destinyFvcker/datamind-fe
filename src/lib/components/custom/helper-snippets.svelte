<script lang="ts" module>
	import { base } from '$app/paths';
	import { cn } from '$lib/utils';
	import { ArrowDown, ArrowUp, Equal } from 'lucide-svelte';

	export { cellWichSignColor, cellCenter, cellRight, cellRef };
</script>

{#snippet cellRef(value: string)}
	<div class="flex justify-center">
		<a class="text-center" href={`${base}/astock/${value}`}>{value}</a>
	</div>
{/snippet}

{#snippet cellCenter(value: string)}
	<div class="text-center">{value}</div>
{/snippet}

{#snippet cellRight(value: string)}
	<div class="text-right font-mono">{value}</div>
{/snippet}

{#snippet cellWichSignColor(value: number)}
	<div
		class={cn(
			'flex justify-end gap-1',
			value > 0 ? 'text-red-600' : value == 0 ? 'text-gray-600' : 'text-green-600'
		)}
	>
		<span class="font-mono">{value.toFixed(2)} </span>
		{#if value > 0}
			<ArrowUp class="h-5 w-5" />
		{:else if value < 0}
			<ArrowDown class="h-5 w-5" />
		{:else}
			<Equal class="h-5 w-5" />
		{/if}
	</div>
{/snippet}
