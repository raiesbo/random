import {AuthRepository} from "../../repositories/auth.repository";
import {LoginUserDto} from "../../dtos/auth/login-user.dto";
import {JwtAdapter} from "../../../config";
import {SignOptions} from "jsonwebtoken";
import {CustomError} from "../../errors/custom.error";

interface UserToken {
	token: string;
	user: {
		id: string;
		name: string;
		email: string;
	}
}

type SignTokenFn = (payload: Object, duration?: SignOptions["expiresIn"]) => Promise<string | null>;

interface LoginUserUseCase {
	execute: (loginUserDto: LoginUserDto) => Promise<UserToken>;
}

export class LoginUser implements LoginUserUseCase{

	constructor(
		private readonly userRepository: AuthRepository,
		private readonly signToken: SignTokenFn = JwtAdapter.generateToken,
	) {
		// ...
	}

	async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
		const user = await this.userRepository.login(loginUserDto);
		const token = await this.signToken({ id: user.id }, '2h');
		if (!token) throw CustomError.internalServerError('Could not generate token');

		return {
			token,
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
			}
		}
	}
}