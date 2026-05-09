import {sign, SignOptions, verify} from "jsonwebtoken";
import {envs} from "./envs";

const JWT_SEED= envs.JWT_SEED;

export class JwtAdapter {

	static async generateToken(
		payload: Object,
		duration: SignOptions['expiresIn'] = '2h'
	): Promise<string | null> {
		return sign(payload, JWT_SEED, { expiresIn: duration as number })
	}

	static async validateToken<T>(token: string): Promise<T> {
		return verify(token, JWT_SEED) as T
	}
}