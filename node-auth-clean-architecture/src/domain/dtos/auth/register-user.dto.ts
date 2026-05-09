import {Validators} from "../../../config";

export class RegisterUserDto {

	private constructor(
		public name: string,
		public email: string,
		public password: string,
	) {
		// ...
	}

	static fromJSON(json: Record<string, string>): { error?: string, user?: RegisterUserDto } {
		const { email, password, name } = json;

		if (!name) return { error: 'Missing name' };
		if (!email) return { error: 'Missing email' };
		if (!Validators.email.test(email)) return { error: 'Invalid email' };
		if (!password) return { error: 'Missing password' };
		if (password.length < 6) return { error: 'Password must be at least 6 characters' };

		const registeredUser = new RegisterUserDto(name, email, password);
		return { user: registeredUser }
	}
}