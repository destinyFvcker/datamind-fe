<!-- 401.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
</script>

<div class="flex min-h-screen items-center justify-center">
	<div class="mx-auto max-w-md rounded-lg p-8 text-center shadow-md">
		<h1 class="text-9xl font-bold">401</h1>
		<div class="my-4 h-1 w-full bg-red-500"></div>
		<h2 class="mb-4 text-2xl font-semibold">Unauthorized Access</h2>
		<p class="mb-6">
			You need to be logged in to view this page. Your session may have expired or you might not
			have the necessary permissions.
		</p>
		<button
			onclick={() => goto(`${base}/auth`)}
			class="inline-block rounded-lg bg-red-600 px-6 py-3 font-medium text-white shadow-sm transition-colors duration-300 hover:bg-red-700"
		>
			Go to Login
		</button>
	</div>
</div>
