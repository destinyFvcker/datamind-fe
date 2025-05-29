<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import UserAuthForm from './(components)/user-auth-form.svelte';
	import { globalStatus } from '$lib/global.svelte';
	import { jwtStorage } from '$lib';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';

	globalStatus.isNavShow = false;
	if (jwtStorage.getData()) {
		globalStatus.isNavShow = true;
		goto(`${base}/`);
	}

	onMount(() => {
		globalStatus.isInAuthPage = true;
	});

	onDestroy(() => {
		globalStatus.isInAuthPage = false;
	});
</script>

<div
	class="relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
>
	<div class="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
		<div
			class="absolute inset-0 bg-cover"
			style="
				background-image:
					url(https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);"
		></div>
		<div class="relative z-20 mt-4 flex items-center font-mono text-lg font-bold text-black">
			Data Mind
		</div>
		<p class="z-20 text-sm text-black">
			&ldquo;智能解读量化数据，实时监控预警，自动响应客户问题。&rdquo;
		</p>
	</div>
	<div class="lg:p-8">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
			<UserAuthForm />
			<p class="text-muted-foreground px-8 text-center text-sm">
				By clicking continue, you agree to our
				<a href="/terms" class="hover:text-primary underline underline-offset-4">
					Terms of Service
				</a>
				and
				<a href="/privacy" class="hover:text-primary underline underline-offset-4">
					Privacy Policy
				</a>
				.
			</p>
		</div>
	</div>
</div>
