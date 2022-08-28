import { NextFunction, Request, Response } from "express";
import JwtService from "../services/Jwt.service";
import { IJwtPayload } from "../types/JwtPayload";

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.method === "OPTIONS") {
		return next();
	}
	try {
		const token = req.headers.authorization.split(" ")[1];

		if (!token) {
			res.status(401).json("Auth error, token must be provided");
		}

		req.user = JwtService.decodeToken(token) as IJwtPayload;
		next();
	} catch (e) {
		return res.status(401).json(`Auth error, message: ${e}`);
	}
};
