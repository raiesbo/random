import {Server} from './presentation/server';
import {envs} from "./config";
import {AppRoutes} from "./presentation/routes";
import {MongoDatabase} from "./data/mongodb";

(() => {
	main();
})()

async function main() {
	await MongoDatabase.connect({
		dbName: envs.MONGO_DB_NAME,
		mongoURI: envs.MONGO_URI,
	});

	await new Server({
		port: envs.PORT,
		routes: AppRoutes.routes
	}).start();
}

