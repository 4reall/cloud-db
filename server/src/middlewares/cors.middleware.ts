import { NextFunction, Request, Response } from "express";

export const corsMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Methods",
		"DELETE, POST, GET, OPTIONS, PATCH, PUT"
	);
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
	next();
};
