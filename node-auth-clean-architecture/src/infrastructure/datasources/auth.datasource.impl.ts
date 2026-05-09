import {AuthDatasource, CustomError, RegisterUserDto, UserEntity} from "../../domain";
import {UserModel} from "../../data/mongodb";
import {BcryptAdapter} from "../../config";
import {UserMapper} from "../mappers/user.mapper";

type HashPassword = (password: string) => string;
type ComparePassword = (password: string, hash: string) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {

	constructor(
		private readonly hashPassword: HashPassword,
		private readonly comparePassword: ComparePassword,
	) {
		// ...
	}

	async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
		const { name, email, password } = registerUserDto;

		try {
			const emailExists = await UserModel.findOne({ email });
			if (emailExists) throw CustomError.badRequest('User already exists');

			const user = await UserModel.create({
				name,
				email,
				password: this.hashPassword(password),
			})

			await user.save();

			// TODO: It is missing a mapper
			return UserMapper.userEntityFromObject(user);

		} catch (e) {
			if (e instanceof CustomError) {
				throw e
			}

			throw CustomError.internalServerError();
		}
	}

	async login(loginUserDto: { email: string, password: string }): Promise<UserEntity> {
		const { email, password } = loginUserDto;
		try {
			const user = await UserModel.findOne({ email })
			if (!user) throw CustomError.badRequest('User not found');

			const isMatching = this.comparePassword(password, user.password)
			if (!isMatching) throw CustomError.badRequest('Invalid password');

			return UserMapper.userEntityFromObject(user);
		} catch (e) {
			if (e instanceof CustomError) {
				throw e
			}

			throw CustomError.internalServerError();
		}
	}
}
