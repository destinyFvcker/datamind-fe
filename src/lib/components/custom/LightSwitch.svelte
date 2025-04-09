<script lang="ts">
	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';
	import Icon from '@iconify/svelte';
</script>

<Button onclick={toggleMode} variant="outline" size="icon" class="absolute right-2 top-2 z-30">
	<Icon
		icon="line-md:sun-rising-loop"
		class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
	/>
	<Icon
		icon="line-md:moon-alt-loop"
		width="24"
		height="24"
		class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
	/>
	<span class="sr-only">Toggle theme</span>
</Button>
