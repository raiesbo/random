import {Validators} from "../../../config";

export class LoginUserDto {

	private constructor(
		public email: string,
		public password: string,
	) {
		// ...
	}

	static fromJSON(json: Record<string, string>): { error?: string, user?: LoginUserDto } {
		const { email, password } = json;

		if (!email) return { error: 'Missing email' };
		if (!Validators.email.test(email)) return { error: 'Invalid email' };
		if (!password) return { error: 'Missing password' };
		if (password.length < 6) return { error: 'Password must be at least 6 characters' };

		const loginUser = new LoginUserDto(email, password);
		return { user: loginUser }
	}
}