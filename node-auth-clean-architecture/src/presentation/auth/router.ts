import {Router} from "express";
import {AuthController} from "./controller";
import {AuthDatasourceImpl, AuthRepositoryImpl} from "../../infrastructure";
import {BcryptAdapter} from "../../config";
import {AuthMiddleware} from "../middlewares/auth.middleware";

export class AuthRoutes {

	static get routes(): Router {

		const router = Router();

		// Specific implementation of the DB
		const database = new AuthDatasourceImpl(
			BcryptAdapter.hash,
			BcryptAdapter.compare,
		)
		// Specific implementation of the Repository
		const authRepository = new AuthRepositoryImpl(database);
		// Inject the repository into the controller
		const controller = new AuthController(authRepository);

		// Define all Auth routes
		router.post('/login', controller.loginUser)
		router.post('/register', controller.registerUser)
		router.get('/users', AuthMiddleware.validateJWT, controller.getUsers)

		return router;
	}
}
