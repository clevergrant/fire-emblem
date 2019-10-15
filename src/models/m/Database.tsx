export class Database {

	public static instance: Database

	public static getInstance() {
		if (!this.instance)
			this.instance = new Database()
		return this.instance
	}

	constructor() {
		this.__init()
	}

	private async __init() {
		await fetch(`codes.json`).then(response => response.json())
	}
}