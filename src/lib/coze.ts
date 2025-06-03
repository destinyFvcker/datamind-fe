export class CozeAgent {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private client: any;
	private config = {
		bot_id: '7505453994324705319',
		token: 'pat_SPNzZxD7hbwcpaYLHjVMB35XPnjhXZpRELzF6OrkPjr2SEUkDygJNWsGVXL6lDXV',
		// token: 'pat_NxqWe78cV66mkZ0jeroHuMQVSgB23IOzyBxWOVBUoQSozVBULlT1gpsvWGQOpxuV',
		// token: 'pat_NxqWe78cV66mkZ0jeroHuMQVSgB23IOzyBxWOVBUoQSozVBULlT1gpsvWGQOpxaa',
		// pat_SPNzZxD7hbwcpaYLHjVMB35XPnjhXZpRELzF6OrkPjr2SEUkDygJNWsGVXL6lDXV
		title: '监控平台智能客服',
		icon: 'https://s2.loli.net/2025/05/02/byJTi3vzx6uARoY.png',
		id: 0,
		nickname: '用户',
		avartar_url: 'https://s2.loli.net/2025/05/28/5WCKgdOnqLlSMa6.jpg'
	};

	constructor(customConfig?: Partial<typeof this.config>) {
		this.config = { ...this.config, ...customConfig };
		// this.init();
	}

	private init() {
		this.client = new CozeWebSDK.WebChatClient({
			config: {
				bot_id: this.config.bot_id
			},
			componentProps: {
				title: 'Coze'
			},
			auth: {
				type: 'token',
				token: this.config.token,
				onRefreshToken: () => {
					return this.config.token;
					// const res = await getCozeAccessToken();
					// if (res) {
					// 	this.config.token = res.data;
					// }
					// return res?.data;
				}
			},
			ui: {
				base: {
					icon: this.config.icon
				},
				chatBot: {
					title: this.config.title,
					onHide: this.onHide.bind(this),
					onShow: this.onShow.bind(this)
				}
			},
			userInfo: {
				id: this.config.id.toString(),
				url: this.config.avartar_url,
				nickname: this.config.nickname
			}
		});
	}

	private onHide() {
		console.log('聊天窗口隐藏');
	}

	private onShow() {
		console.log('聊天窗口显示');
	}

	public refresh(customConfig?: Partial<typeof this.config>) {
		this.config = { ...this.config, ...customConfig };
		// console.log(this.config);
		this.destroy();
		this.init();
	}

	public show() {
		this.client?.show();
	}

	public hide() {
		this.client?.hide();
	}

	public destroy() {
		this.client?.destroy();
	}
}

export const cozeAgent = new CozeAgent();

//  使用示例
// const cozeAgent = new CozeAgent();
//  或自定义配置
// const customAgent = new CozeAgent({
// 	title: '自定义客服',
// 	bot_id: 'your_bot_id'
// });
