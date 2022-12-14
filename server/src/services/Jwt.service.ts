import jwt from "jsonwebtoken";
import { IUser } from "../types/User";
import { JWT_KEY } from "../utils/constants/env";

class JwtService {
	createToken(user: IUser): string {
		return jwt.sign({ _id: user._id }, JWT_KEY, {
			expiresIn: "1h",
		});
	}

	decodeToken(token: string) {
		try {
			return jwt.verify(token, JWT_KEY);
		} catch (e) {
			throw new Error("Decode Error: " + e.message);
		}
	}
}

export default new JwtService();
