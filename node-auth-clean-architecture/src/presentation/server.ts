// @ts-ignore
import express, {Router} from "express";

type Options = {
	port?: number;
	routes: Router;
}

export class Server {

	public readonly app = express();
	private readonly port: number;
	private readonly routes: Router;

	constructor(options: Options) {
		const { port = 3100, routes } = options;

		this.port = port;
		this.routes = routes;
	}

	async start() {
		// Allow the server to receive JSON data.
		this.app.use(express.json());
		// Allow the server to receive data from URL encoded (x-www-form-urlencoded).
		this.app.use(express.urlencoded({ extended: true }));

		// Use the defined routes.
		this.app.use(this.routes);

		// Listen for requests.
		this.app.listen(this.port, () => {
			console.log(`Server running in port ${this.port}`);
		})
	}
}

