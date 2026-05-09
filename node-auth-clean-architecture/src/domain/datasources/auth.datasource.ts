import {UserEntity} from "../entities/user.entity";
import {RegisterUserDto} from "../dtos/auth/register-user.dto";
import {LoginUserDto} from "../dtos/auth/login-user.dto";

// The Data Source contains the business logic/rules.
export abstract class AuthDatasource {

	// TODO
	// abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;

	abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;

	abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;
}
