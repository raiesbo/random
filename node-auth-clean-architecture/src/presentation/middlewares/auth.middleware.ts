import {NextFunction, Request, Response} from "express";
import {JwtAdapter} from "../../config";
import {TokenExpiredError} from "jsonwebtoken";
import {UserModel} from "../../data/mongodb";

export class AuthMiddleware {

	static async validateJWT(req: Request, res: Response, next: NextFunction) {

		const authorization = req.header('Authorization');
		if (!authorization) return res.status(401).json({ error: 'Unauthorized' });
		if (!authorization.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });

		const token = authorization.split(' ')[1] || ''

		try {

			// TODO: Validate JWT and get payload
			const payload = await JwtAdapter.validateToken<{id: string}>(token);
			if (!payload) return res.status(401).json({ error: 'Invalid token' });

			console.log({payload})
			const user = await UserModel.findById(payload.id);
			console.log({user})
			if (!user) return res.status(401).json({ error: 'User not found' });

			res.locals.user = user

			next();
		} catch (e) {
			if (e instanceof TokenExpiredError) {
				console.log('we are here')
				return res.status(401).json({ error: 'Token expired' });
			}
			if (e instanceof Error) return res.status(401).json({ error: e.message });
			res.status(500).json({ error: 'Internal server error' });
		}

		console.log('validateJWT, after');
	}
}