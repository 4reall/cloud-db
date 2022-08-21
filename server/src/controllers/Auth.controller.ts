import { Request, Response } from "express";
import { File } from "../models/File.model";
import { User } from "../models/User.model";
import FileService from "../services/File.service";
import HashService from "../services/Hash.service";
import { validationResult } from "express-validator";
import JwtServices from "../services/Jwt.service";
import { IBaseRequest } from "../types/BaseRequest";
import { IUserRequest } from "../types/UserRequest";

class AuthController {
	async registerUser(req: IBaseRequest<IUserRequest>, res: Response) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({
					message: `Incorrect request`,
					errors,
				});
			}

			const { email, password } = req.body;

			const candidate = await User.findOne({ email });

			if (candidate) {
				return res.status(400).json({
					message: `User with email ${email} is already exist`,
				});
			}

			const hashPassword = await HashService.hashPassword(password);
			const user = new User({ email, password: hashPassword });
			await user.save();
			FileService.createDir(new File({ userId: user.id, name: "" }));

			return res.json({ message: "User has been created" });
		} catch (e) {
			res.status(500).json({ message: e.message });
		}
	}

	async loginUser(req: IBaseRequest<IUserRequest>, res: Response) {
		try {
			const { email, password } = req.body;

			const user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json({
					message: `User not found`,
				});
			}

			const isPassValid = HashService.isValidPassword(
				password,
				user.password
			);

			if (!isPassValid) {
				return res.status(400).json({
					message: `Invalid password`,
				});
			}

			const token = JwtServices.createToken(user);

			return res.json({
				token,
				user: {
					id: user.id,
					email: user.email,
					diskSpace: user.diskSpace,
					usedSpace: user.usedSpace,
				},
			});
		} catch (e) {
			res.status(500).json({ message: e.message });
		}
	}

	async authUser(req: Request, res: Response) {
		try {
			const user = await User.findOne({ _id: req.user.id });

			const token = JwtServices.createToken(user);

			return res.json({
				token,
				user: {
					_id: user.id,
					email: user.email,
					diskSpace: user.diskSpace,
					usedSpace: user.usedSpace,
				},
			});
		} catch (e) {
			res.status(500).json({ message: e.message });
		}
	}
}

export default new AuthController();
