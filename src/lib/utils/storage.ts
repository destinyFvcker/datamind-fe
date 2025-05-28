// 创建一个工具类来处理 localStorage 操作
export class LocalStorageUtil<T> {
	private key: string;

	constructor(key: string) {
		this.key = key;
	}

	// 获取数据
	getData(): T | null {
		const data = localStorage.getItem(this.key);
		if (!data) return null;

		try {
			// 解析存储的 JSON 字符串
			const parsedData = JSON.parse(data);

			// 处理特殊类型，如 Date
			if (parsedData.lastLogin) {
				parsedData.lastLogin = new Date(parsedData.lastLogin);
			}

			return parsedData as T;
		} catch (error) {
			console.error('Error parsing data from localStorage:', error);
			return null;
		}
	}

	// 保存数据
	saveData(data: T): void {
		try {
			// 将数据转换为 JSON 字符串
			const stringData = JSON.stringify(data);
			localStorage.setItem(this.key, stringData);
		} catch (error) {
			console.error('Error saving data to localStorage:', error);
		}
	}

	// 更新部分数据
	updateData(partialData: Partial<T>): void {
		const currentData = this.getData();
		if (currentData) {
			this.saveData({ ...currentData, ...partialData });
		} else {
			console.error('Cannot update data that does not exist');
		}
	}

	// 删除数据
	removeData(): void {
		localStorage.removeItem(this.key);
	}
}
