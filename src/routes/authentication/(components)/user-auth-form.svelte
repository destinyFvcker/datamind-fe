<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import Icon from '@iconify/svelte';
	import { cn } from '$lib/utils.js';
	import { toast } from 'svelte-sonner';
	import type { HTMLAttributes } from 'svelte/elements';
	import { getGithubState } from '$lib/api/auth';

	const { class: className, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();

	let isLogin = $state(true);
	let isLoading = $state(false);

	async function onSubmitSingIn(event: SubmitEvent) {
		event.preventDefault();
		isLoading = true;

		setTimeout(() => {
			isLoading = false;
		}, 5000);
	}

	async function onSubmitLogIn(event: SubmitEvent) {
		event?.preventDefault();
		isLoading = true;

		setTimeout(() => {
			isLoading = false;
		}, 5000);
	}

	async function onGithubSignIn() {
		isLoading = true;
		const timeoutId = setTimeout(() => {
			isLoading = false;
		}, 5000);

		try {
			const githubStatus = await getGithubState();

			if (!githubStatus.data) {
				toast.error(`Github state require failed, please check your internet connection.`);
				isLoading = false;
				clearTimeout(timeoutId);
				return;
			}

			const uri =
				'https://github.com/login/oauth/authorize?' +
				'client_id=Ov23lim6oTncg9iWxk1T' +
				'&redirect_uri=http://localhost:8800/auths/github/callback' +
				`&state=${githubStatus.data.state}`;
			window.location.href = uri;
		} catch {
			toast.error(`Github state require failed, please check your internet connection.`);
			isLoading = false;
			clearTimeout(timeoutId);
		}
	}
</script>

{#if isLogin}
	<div class="flex flex-col space-y-2 text-center">
		<h1 class="text-2xl font-semibold tracking-tight">Login</h1>
		<p class="flex items-center justify-center gap-1 text-sm text-muted-foreground">
			start your journey with data-mind!
			<Icon icon="line-md:emoji-smile-wink" width="24" height="24" />
		</p>
	</div>
{:else}
	<div class="flex flex-col space-y-2 text-center">
		<h1 class="text-2xl font-semibold tracking-tight">Create an account</h1>
		<p class="flex items-center justify-center gap-1 text-sm text-muted-foreground">
			Enter your email below to create your account
			<Icon icon="line-md:heart" width="24" height="24" />
		</p>
	</div>
{/if}

<div class={cn('grid gap-6', className)} {...restProps}>
	<div class="grid gap-4">
		{#if isLogin}
			<form onsubmit={onSubmitSingIn}>
				<div class="grid gap-3">
					<div class="grid gap-2.5">
						<Icon icon="material-symbols:mail" width="24" height="24" />
						<Input
							id="email"
							placeholder="enter your email"
							type="email"
							autocapitalize="none"
							autocomplete="email"
							autocorrect="off"
							disabled={isLoading}
						/>
						<Icon icon="ic:round-password" width="24" height="24" />
						<Input
							id="password"
							placeholder="enter your password"
							type="password"
							autocomplete="current-password"
							required
							autocapitalize="none"
							autocorrect="off"
							spellcheck="false"
							disabled={isLoading}
						/>
					</div>
					<Button type="submit" disabled={isLoading}>
						{#if isLoading}
							<Icon icon="line-md:loading-twotone-loop" width="26" height="26" />
						{/if}
						Sign In with Email
					</Button>
				</div>
			</form>
		{:else}
			<form onsubmit={onSubmitSingIn}>
				<div class="grid gap-2">
					<div class="grid gap-2.5">
						<Icon icon="material-symbols:mail" width="24" height="24" />
						<Input
							id="email"
							placeholder="name@example.com"
							type="email"
							autocapitalize="none"
							autocomplete="email"
							autocorrect="off"
							disabled={isLoading}
						/>
						<Icon icon="ic:round-password" width="24" height="24" />
						<Input
							id="password"
							placeholder="enter your password"
							type="password"
							autocomplete="new-password"
							required
							autocapitalize="none"
							autocorrect="off"
							spellcheck="false"
							disabled={isLoading}
						/>
						<Input
							id="password"
							placeholder="confirm your password"
							type="password"
							autocomplete="new-password"
							required
							autocapitalize="none"
							autocorrect="off"
							spellcheck="false"
							disabled={isLoading}
						/>
					</div>
					<Button type="submit" disabled={isLoading}>
						{#if isLoading}
							<Icon icon="line-md:loading-twotone-loop" width="26" height="26" />
						{/if}
						{isLogin ? 'Login' : 'Sign'} In with Email
					</Button>
				</div>
			</form>
			<!-- </div> -->
		{/if}

		<Button
			variant="ghost"
			disabled={isLoading}
			onclick={() => {
				isLogin = !isLogin;
			}}
		>
			{isLogin ? 'Create a Account' : 'Want Login?'}
			<Icon icon="line-md:log-in" width="24" height="24" class="inline" />
		</Button>
	</div>

	<div class="relative">
		<div class="absolute inset-0 flex items-center">
			<span class="w-full border-t"></span>
		</div>
		<div class="relative flex justify-center text-xs uppercase">
			<span class="bg-background px-2 text-muted-foreground"> Or continue with </span>
		</div>
	</div>

	<div class="grid gap-2">
		<Button variant="outline" type="button" disabled={true}>
			{#if isLoading}
				<Icon icon="line-md:loading-twotone-loop" width="26" height="26" />
			{/if}
			<Icon icon="line-md:chat-round" width="24" height="24" style="color: #0cc125" />
			Wechat
		</Button>
		<Button variant="outline" type="button" disabled={isLoading} onclick={onGithubSignIn}>
			{#if isLoading}
				<Icon icon="line-md:loading-twotone-loop" width="26" height="26" />
			{/if}
			<Icon icon="line-md:github" width="26" height="26" />
			GitHub
		</Button>
	</div>
</div>
