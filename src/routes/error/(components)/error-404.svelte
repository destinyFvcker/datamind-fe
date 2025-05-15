<!-- 404.svelte -->
<script>
	// Svelte 5 uses a new reactive system
	// but for static error pages, we don't need much reactivity
</script>

<div class="flex min-h-screen items-center justify-center">
	<div class="mx-auto max-w-md rounded-lg p-8 text-center shadow-md">
		<h1 class="text-9xl font-bold">404</h1>
		<div class="my-4 h-1 w-full bg-indigo-500"></div>
		<h2 class="mb-4 text-2xl font-semibold">Page Not Found</h2>
		<p class="mb-6">
			The page you are looking for might have been removed, had its name changed, or is temporarily
			unavailable.
		</p>
		<a
			href="/"
			class="inline-block rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white shadow-sm transition-colors duration-300 hover:bg-indigo-700"
		>
			Return Home
		</a>
	</div>
</div>
