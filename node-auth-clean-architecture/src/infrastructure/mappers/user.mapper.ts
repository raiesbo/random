import {CustomError, UserEntity} from "../../domain";

export class UserMapper {
	static userEntityFromObject(object: { [key: string]: any }) {
		const {
		id, _id, name, email, password, roles, img,
		} = object;

		if (!_id && !id) throw CustomError.badRequest('Missing id')
		if (!name) throw CustomError.badRequest('Missing name')
		if (!password) throw CustomError.badRequest('Missing password')
		if (!roles || roles.length < 1) throw CustomError.badRequest('Missing roles')

		return new UserEntity(
			id || _id,
			name,
			email,
			password,
			roles,
			img,
		);
	}
}
