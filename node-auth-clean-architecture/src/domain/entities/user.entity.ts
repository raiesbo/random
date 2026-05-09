export class UserEntity {

	constructor(
		public id: string,
		public name: string,
		public email: string,
		public password: string,
		public roles: ("ADMIN_ROLE" | "USER_ROLE")[],
		public img?: string,
	) {
		// ...
	}

}