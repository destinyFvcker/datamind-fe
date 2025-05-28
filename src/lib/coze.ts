export class CozeAgent {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private client: any;
	private config = {
		bot_id: '7505453994324705319',
		token: 'pat_P7WlikdF2iP2Knb7VMcaMY5Py2EXFEDpLOSXEjtOCcBLUU7p3elm1rIhTjXdVCV0',
		title: '监控平台智能客服',
		icon: 'https://s2.loli.net/2025/05/02/byJTi3vzx6uARoY.png'
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
				onRefreshToken: () => this.config.token
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
