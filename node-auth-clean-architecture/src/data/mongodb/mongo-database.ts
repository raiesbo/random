import {connect} from 'mongoose';

type Options = {
	mongoURI: string;
	dbName: string;
}

export class MongoDatabase {

	static async connect(options: Options) {
		const { mongoURI, dbName } = options;

		try {
			await connect(mongoURI, { dbName });
			console.log('Mongo connected');
		} catch (error) {
			console.error('Mongo connection error', error);
			throw error;
		}
	}
}