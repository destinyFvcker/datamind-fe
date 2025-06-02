<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
</script>

<div class="flex min-h-screen items-center justify-center px-4">
	<div class="w-full max-w-md text-center">
		<div
			class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-red-300"
		>
			<svg class="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
				/>
			</svg>
		</div>

		<!-- 主标题 -->
		<h1 class="mb-4 text-2xl font-bold">邮箱配置缺失</h1>

		<!-- 主要描述 -->
		<p class="mb-6">您尚未配置第三方平台的邮箱服务。请先完成邮箱配置后再继续使用此功能。</p>

		<button
			onclick={() => goto(`${base}/auth`)}
			class="inline-block rounded-lg bg-red-600 px-6 py-3 font-medium text-white shadow-sm transition-colors duration-300 hover:bg-red-700"
		>
			Go to Login
		</button>
	</div>
</div>
