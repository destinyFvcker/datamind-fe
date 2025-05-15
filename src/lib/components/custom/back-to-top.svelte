<script>
	import { onMount } from 'svelte';

	let isVisible = false;

	// Show button when user scrolls down 300px
	const handleScroll = () => {
		isVisible = window.scrollY > 300;
	};

	// Scroll to the top smoothly
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	// Add scroll event listener
	onMount(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<div>
	{#if isVisible}
		<button
			on:click={scrollToTop}
			class="fixed bottom-5 right-5 z-50 transform rounded-full bg-slate-800 p-3 text-white shadow-lg transition hover:scale-110 hover:bg-black"
			aria-label="Back to Top"
		>
			⬆
		</button>
	{/if}
</div>
