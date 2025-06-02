<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
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
	import {
		getUserConfigShow,
		pingRobotApi,
		updateNickNameApi,
		updatePasswordApi,
		updateWebhookApi
	} from '$lib/api/manage';
	import { toast } from 'svelte-sonner';
	import { initApp, jwtStorage } from '$lib';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';

	let isWebhookFocus = $state(false);
	let isNickNameFocus = $state(false);
	let isSecretDialogShow = $state(false);
	let isPasswordDialogShow = $state(false);

	let originWebhookAddr = '';
	let originNickName = '';

	let webhookAddr = $state('');
	let signSecret = $state('');
	let nickName = $state('');

	let oldPassword = $state('');
	let newPassword = $state('');
	let confirmPassword = $state('');

	const getShowData = async () => {
		const res = await getUserConfigShow();

		if (res) {
			webhookAddr = res.data.ding_webhook_addr ?? '';
			nickName = res.data.nick_name;
		}
	};
	getShowData();

	const pingRobot = async () => {
		const res = await pingRobotApi();
		if (res) {
			toast.success(`${res.message}`);
		}
	};

	const updateWebhook = async () => {
		const res = await updateWebhookApi({ webhook_addr: webhookAddr });
		if (res) {
			toast.success(`${res.message}`);
			getShowData();
			isWebhookFocus = false;
		}
	};

	const updateSecret = async () => {
		const res = await updateWebhookApi({ signature: signSecret });
		if (res) {
			toast.success(`${res.message}`);
			isSecretDialogShow = false;
		}
	};

	const updateNickName = async () => {
		const res = await updateNickNameApi(nickName);

		if (res) {
			toast.success(`${res.message}`);
			getShowData();
			initApp();
			isNickNameFocus = false;
		}
	};

	const updatePassword = async () => {
		if (newPassword != confirmPassword) {
			toast.error('两次输入的密码不一致！请重新输入');
			return;
		}

		const res = await updatePasswordApi(oldPassword, newPassword);

		if (res) {
			toast.success(res.message);
			isPasswordDialogShow = false;
			// TODO 加入一个退出登录之类的流程
		}
	};

	const onLogout = () => {
		jwtStorage.removeData();
		goto(`${base}/auth`);
		//
	};
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

						<Tooltip.Provider delayDuration={200}>
							<Tooltip.Root>
								<Tooltip.Trigger>
									<Button class="h-4 gap-1 transition hover:scale-110" onclick={() => pingRobot()}>
										<Icon icon="line-md:cellphone-arrow-up" />
										发送测试消息
									</Button>
								</Tooltip.Trigger>
								<Tooltip.Content>
									<p>每分钟不能发送超过20条消息，否则将被禁用10分钟</p>
								</Tooltip.Content>
							</Tooltip.Root>
						</Tooltip.Provider>
					</div>
					<div class="space-y-4">
						<div>
							<span class="mb-1 block text-sm">你的报警机器人webhook地址:</span>
							<form
								onsubmit={async (e) => {
									e.preventDefault();
									updateWebhook();
								}}
							>
								<div
									class="flex w-full gap-2"
									onfocusout={(e) => {
										// 检查焦点是否离开整个容器
										if (!e.currentTarget.contains(e.relatedTarget as HTMLElement)) {
											webhookAddr = originWebhookAddr;
											isWebhookFocus = false;
										}
									}}
								>
									<div class="relative">
										<Webhook
											class="text-muted-foreground absolute top-[50%] left-2 h-4 w-4 translate-y-[-50%]"
										/>
										<Input
											type="text"
											placeholder="webhook地址"
											class="w-[600px] border-2 border-slate-400! pl-8 focus-visible:ring-offset-1"
											required
											onfocus={() => {
												originWebhookAddr = webhookAddr;
												isWebhookFocus = true;
											}}
											bind:value={webhookAddr}
										/>
									</div>
									{#if isWebhookFocus}
										<div class="flex gap-1" transition:fly>
											<Button type="submit">确认</Button>
											<Button
												variant="secondary"
												onclick={() => {
													webhookAddr = originWebhookAddr;
													isWebhookFocus = false;
												}}>取消</Button
											>
										</div>
									{/if}
								</div>
							</form>
						</div>
						<div>
							<span class="block text-sm">
								你的报警机器人密钥:(详见<a
									href="https://open.dingtalk.com/document/robots/customize-robot-security-settings"
									class="underline underline-offset-2">说明文档</a
								>)
							</span>
							<Dialog.Root
								bind:open={isSecretDialogShow}
								onOpenChange={() => {
									signSecret = '';
								}}
							>
								<Dialog.Trigger
									class={cn('border-2! border-slate-400!', buttonVariants({ variant: 'outline' }))}
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
									<form
										onsubmit={(e) => {
											e.preventDefault();
											updateSecret();
										}}
									>
										<div class="w-full">
											<Textarea
												placeholder="输入新的报警机器人密钥"
												required
												class="break-all"
												bind:value={signSecret}
											/>
										</div>
										<div class="h-5"></div>
										<Dialog.Footer>
											<Button type="submit">保存</Button>
										</Dialog.Footer>
									</form>
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
						{globalStatus.userInfo?.email ?? 'unknow@error.com'}
					</div>
					<div>
						<span class="text-sm">修改昵称:</span>
						<form
							onsubmit={(e) => {
								e.preventDefault();
								updateNickName();
							}}
						>
							<div
								class="flex w-full gap-2"
								onfocusout={(e) => {
									// 检查焦点是否离开整个容器
									if (!e.currentTarget.contains(e.relatedTarget as HTMLElement)) {
										nickName = originNickName;
										isNickNameFocus = false;
									}
								}}
							>
								<div class="relative">
									<PersonStanding
										class="text-muted-foreground absolute top-[50%] left-2 h-4 w-4 translate-y-[-50%]"
									/>
									<Input
										type="text"
										placeholder="你的昵称"
										class="w-[300px] border-2 border-slate-400! pl-8 focus-visible:ring-offset-1"
										required
										onfocus={() => {
											originNickName = nickName;
											isNickNameFocus = true;
										}}
										bind:value={nickName}
									/>
								</div>
								{#if isNickNameFocus}
									<div class="flex gap-1" transition:fly>
										<Button type="submit">确认</Button>
										<Button
											variant="secondary"
											onclick={() => {
												nickName = originNickName;
												isNickNameFocus = false;
											}}>取消</Button
										>
									</div>
								{/if}
							</div>
						</form>
					</div>
					<div>
						<div class="">
							<span class="text-sm">修改密码:</span>
							<span class="text-sm text-gray-500">(Oauth登录用户默认密码为12345678)</span>
						</div>
						<Dialog.Root
							bind:open={isPasswordDialogShow}
							onOpenChange={() => {
								oldPassword = '';
								newPassword = '';
								confirmPassword = '';
							}}
						>
							<Dialog.Trigger
								class={cn('border-2! border-slate-400!', buttonVariants({ variant: 'outline' }))}
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
								<form onsubmit={updatePassword}>
									<div class="grid gap-4 py-4">
										<div class="grid grid-cols-4 items-center gap-4">
											<Label for="oldpassword" class="text-right">旧密码</Label>
											<Input
												id="oldpassword"
												class="col-span-3"
												placeholder="输入旧密码……"
												required
												autocorrect="off"
												spellcheck="false"
												type="password"
												bind:value={oldPassword}
											/>
										</div>
										<div class="grid grid-cols-4 items-center gap-4">
											<Label for="newpassword" class="text-right">新密码</Label>
											<Input
												id="newpassword"
												class="col-span-3"
												placeholder="输入新密码……"
												required
												autocorrect="off"
												spellcheck="false"
												type="password"
												bind:value={newPassword}
											/>
										</div>
										<div class="grid grid-cols-4 items-center gap-4">
											<Label for="confirmpassword" class="text-right">确认新密码</Label>
											<Input
												id="confirmpassword"
												class="col-span-3"
												placeholder="确认新密码……"
												required
												autocorrect="off"
												spellcheck="false"
												type="password"
												bind:value={confirmPassword}
											/>
										</div>
									</div>
									<Dialog.Footer>
										<Button type="submit">保存变更</Button>
									</Dialog.Footer>
								</form>
							</Dialog.Content>
						</Dialog.Root>
					</div>

					<div>
						<span class="block text-sm">绑定第三方账号:</span>
						<Button variant="outline" class="flex gap-1 border-2! border-slate-400!">
							<Icon icon="line-md:github" width="24" height="24" />
							绑定github账号
						</Button>
					</div>
				</div>
			</div>
			<div class="h-5"></div>
			<Button variant="destructive" class="flex w-fit gap-1 " onclick={onLogout}>
				<Icon icon="line-md:logout" width="24" height="24" />
				登出
			</Button>
		</div>
	</Card.Content>
</Card.Root>
