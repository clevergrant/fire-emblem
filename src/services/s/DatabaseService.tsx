import { Database } from 'models'

export class DatabaseService {

	private __db: Database = Database.getInstance()

	public getData() {
		return this.__db
	}
}
