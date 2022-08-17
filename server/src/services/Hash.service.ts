import { hash, compareSync } from "bcrypt";

class HashService {
	async hashPassword(password: string) {
		return hash(password, 7);
	}

	isValidPassword(testPassword: string, validPassword: string) {
		return compareSync(testPassword, validPassword);
	}
}

export default new HashService();
