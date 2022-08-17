import Router from "express";
import authController from "../controllers/Auth.controller";
import { check } from "express-validator";
import { authMiddleware } from "../middlewares/auth.middleware";

const authRouter = Router();

authRouter.post(
	"/registration",
	[
		check("email", "Incorrect email address").isEmail(),
		// check("password", "Incorrect password").isStrongPassword({
		// 	minLength: 8,
		// 	minLowercase: 1,
		// 	minUppercase: 1,
		// 	minNumbers: 1,
		// 	minSymbols: 1,
		// }),
		check("password", "Incorrect password").isLength({
			min: 4,
			max: 12,
		}),
	],
	authController.registerUser
);

authRouter.post("/login", authController.loginUser);

authRouter.get("/auth", authMiddleware, authController.authUser);

export default authRouter;
