import {RegisterUserDto} from "../../dtos/auth/register-user.dto";
import {AuthRepository} from "../../repositories/auth.repository";
import {SignOptions} from "jsonwebtoken";
import {JwtAdapter} from "../../../config";
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

interface RegisterUserUseCase {
	execute: (registerUserDto: RegisterUserDto) => Promise<UserToken>;
}

export class RegisterUser implements RegisterUserUseCase {

	constructor(
		private readonly userRepository: AuthRepository,
		private readonly signToken: SignTokenFn = JwtAdapter.generateToken,
	) {
		// ...
	}

	async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
		const user = await this.userRepository.register(registerUserDto);
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