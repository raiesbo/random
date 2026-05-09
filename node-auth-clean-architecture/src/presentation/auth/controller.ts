import {Request, Response} from "express";
import {AuthRepository, CustomError, LoginUser, LoginUserDto, RegisterUser, RegisterUserDto} from "../../domain";
import {UserModel} from "../../data/mongodb";

export class AuthController {

	// Dependency Injection
	constructor(
		private readonly authRepository: AuthRepository,
	) {
		// ...
	}

	private handleError(error: unknown, res: Response) {
		if (error instanceof CustomError) return res.status(error.statusCode).json({ error: error.message });
		return res.status(500).json({ error: "Internal Server Error" });
	}

	registerUser = async (req: Request, res: Response) => {
		const { error, user } = RegisterUserDto.fromJSON(req.body);
		if (error) return res.status(400).json({ error });
		if (!user) return res.status(400).json({ error: 'Invalid user data' });

		new RegisterUser(this.authRepository)
			.execute(user)
			.then(data => res.json(data))
			.catch(e => this.handleError(e, res));
	}

	loginUser = async (req: Request, res: Response) => {
		const { error, user } = LoginUserDto.fromJSON(req.body);
		if (error) return res.status(400).json({ error });
		if (!user) return res.status(400).json({ error: 'Invalid user data' });

		new LoginUser(this.authRepository)
			.execute(user)
			.then(data => res.json(data))
			.catch(e => this.handleError(e, res))
	}

	getUsers = (req: Request, res: Response) => {
		UserModel.find()
			.then(users => res.json({
				user: res.locals.user,
				users
			}))
			.catch(e => this.handleError(e, res))
	}
}
