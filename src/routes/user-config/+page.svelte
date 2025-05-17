<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { CircleHelp, Cog, PersonStanding, RotateCcwKey, Webhook } from 'lucide-svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import Icon from '@iconify/svelte';
	import { cn } from '$lib/utils';
	import { fly } from 'svelte/transition';
	import { globalStatus } from '$lib/global.svelte';

	let isWebhookFocus = $state(false);
	let isNickNameFocus = $state(false);
</script>

<Card.Root>
	<Card.Header>
		<Card.Title class="flex gap-2">
			<Cog />
			用户设置
		</Card.Title>
		<Card.Description>调整你的data-mind设置.</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="flex h-screen flex-col gap-2 px-2">
			<Separator />
			<div class="space-y-4 overflow-auto border-4 border-y-0 border-x-blue-700 px-2">
				<div class="flex gap-2 text-lg font-bold">
					<Icon icon="line-md:bell-loop" width="24" height="24" />
					报警设置
				</div>

				<div class="space-y-2">
					<div class="flex items-center gap-2 text-sm">
						<div class="flex size-2 rounded-full bg-blue-500"></div>
						钉钉报警机器人🤖
						<Button class="h-4 gap-1">
							<Icon icon="line-md:cellphone-arrow-up" />
							发送测试消息
						</Button>
					</div>
					<div class="space-y-4">
						<div>
							<span class="mb-1 block text-sm">你的报警机器人webhook地址:</span>
							<div class="flex w-full gap-2">
								<div class="relative">
									<Webhook
										class="absolute left-2 top-[50%] h-4 w-4 translate-y-[-50%] text-muted-foreground"
									/>
									<Input
										type="text"
										placeholder="webhook地址"
										class="w-[600px] border-2 !border-slate-400 pl-8 focus-visible:ring-offset-1"
										onfocus={() => {
											isWebhookFocus = true;
										}}
										onblur={() => {
											isWebhookFocus = false;
										}}
									/>
								</div>
								{#if isWebhookFocus}
									<div class="flex gap-1" transition:fly>
										<Button>确认</Button>
										<Button variant="secondary">取消</Button>
									</div>
								{/if}
							</div>
						</div>
						<div>
							<span class="block text-sm">
								你的报警机器人密钥:(详见<a
									href="https://open.dingtalk.com/document/robots/customize-robot-security-settings"
									class="underline underline-offset-2">说明文档</a
								>)
							</span>
							<Dialog.Root>
								<Dialog.Trigger
									class={cn('!border-2 !border-slate-400', buttonVariants({ variant: 'outline' }))}
								>
									<div class="flex items-center gap-1">
										<Icon icon="line-md:security-twotone" width="24" height="24" />
										修改密钥
									</div>
								</Dialog.Trigger>
								<Dialog.Content>
									<Dialog.Header>
										<Dialog.Title class="flex gap-1">
											<Icon icon="line-md:security-twotone" />
											修改报警机器人密钥
										</Dialog.Title>
										<Dialog.Description>
											使用密钥以保证您的报警机器人安全🔐。(详见<a
												href="https://open.dingtalk.com/document/robots/customize-robot-security-settings"
												class="underline underline-offset-2">说明文档</a
											>)
										</Dialog.Description>
									</Dialog.Header>
									<div class="w-full">
										<Textarea placeholder="输入报警机器人密钥" />
									</div>
									<Dialog.Footer>
										<Button>保存</Button>
									</Dialog.Footer>
								</Dialog.Content>
							</Dialog.Root>
							<Accordion.Root type="single">
								<Accordion.Item value="item-1">
									<Accordion.Trigger>
										<div class="flex items-center gap-1">
											<CircleHelp class="w-5" />
											我应该如何申请报警机器人?
										</div>
									</Accordion.Trigger>
									<Accordion.Content>
										<span class="block"
											>关于申请钉钉报警机器人，见<a
												class="underline underline-offset-2"
												href="https://help.aliyun.com/zh/opentelemetry/user-guide/configure-a-dingtalk-chatbot-to-send-alert-notifications"
												>阿里云文档</a
											>。
										</span>
										<span class="block">
											若想要了解更多详细信息，请参见 1. 关于自定义机器人发送群消息：<a
												class="underline underline-offset-2"
												href="https://open.dingtalk.com/document/orgapp/custom-robots-send-group-messages"
												>钉钉开放平台文档A</a
											>，以及 2. 关于自定义机器人安全设置：<a
												class="underline underline-offset-2"
												href="https://open.dingtalk.com/document/robots/customize-robot-security-settings"
												>钉钉开放平台文档B</a
											>
										</span>
									</Accordion.Content>
								</Accordion.Item>
							</Accordion.Root>
						</div>
					</div>
				</div>
			</div>
			<!--  -->
			<Separator />
			<div class="space-y-4 overflow-auto border-4 border-y-0 border-x-amber-500 px-2 pb-2">
				<div class="flex gap-2 text-lg font-bold">
					<Icon icon="line-md:at" width="24" height="24" />
					账号设置
				</div>
				<div class="space-y-4">
					<div class="flex items-center gap-2">
						<div class="flex size-2 rounded-full bg-amber-500"></div>
						<Icon icon="line-md:email-opened-multiple-filled" width="20" height="20" />
						{globalStatus.email}
					</div>
					<div>
						<span class="text-sm">修改昵称:</span>
						<div class="flex w-full gap-2">
							<div class="relative">
								<PersonStanding
									class="absolute left-2 top-[50%] h-4 w-4 translate-y-[-50%] text-muted-foreground"
								/>
								<Input
									type="text"
									placeholder="你的昵称"
									class="w-[300px] border-2 !border-slate-400 pl-8 focus-visible:ring-offset-1"
									onfocus={() => {
										isNickNameFocus = true;
									}}
									onblur={() => {
										isNickNameFocus = false;
									}}
								/>
							</div>
							{#if isNickNameFocus}
								<div class="flex gap-1" transition:fly>
									<Button>确认</Button>
									<Button variant="secondary">取消</Button>
								</div>
							{/if}
						</div>
					</div>
					<div>
						<span class="block text-sm">修改密码:</span>
						<Dialog.Root>
							<Dialog.Trigger
								class={cn('!border-2 !border-slate-400', buttonVariants({ variant: 'outline' }))}
							>
								<div class="flex items-center gap-1">
									<RotateCcwKey />
									修改密码
								</div>
							</Dialog.Trigger>
							<Dialog.Content>
								<Dialog.Header>
									<Dialog.Title class="flex items-center gap-1">
										<RotateCcwKey />
										修改账号密码
									</Dialog.Title>
									<Dialog.Description>This action cannot be undone.</Dialog.Description>
								</Dialog.Header>
								<div class="grid gap-4 py-4">
									<div class="grid grid-cols-4 items-center gap-4">
										<Label for="name" class="text-right">旧密码</Label>
										<Input id="name" value="Pedro Duarte" class="col-span-3" />
									</div>
									<div class="grid grid-cols-4 items-center gap-4">
										<Label for="username" class="text-right">新密码</Label>
										<Input id="username" value="@peduarte" class="col-span-3" />
									</div>
								</div>
								<Dialog.Footer>
									<Button>保存变更</Button>
								</Dialog.Footer>
							</Dialog.Content>
						</Dialog.Root>
					</div>

					<div>
						<span class="block text-sm">绑定第三方账号:</span>
						<Button variant="outline" class="flex gap-1 !border-2 !border-slate-400">
							<Icon icon="line-md:github" width="24" height="24" />
							绑定github账号
						</Button>
					</div>
				</div>
			</div>
			<div class="h-5"></div>
			<Button variant="destructive" class="flex w-fit gap-1">
				<Icon icon="line-md:logout" width="24" height="24" />
				登出
			</Button>
		</div>
	</Card.Content>
</Card.Root>
