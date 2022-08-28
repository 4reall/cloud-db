import { IJwtPayload } from "./JwtPayload";

export {};

declare global {
	namespace Express {
		// tslint:disable-next-line:interface-name
		interface Request {
			user: IJwtPayload;
		}
	}
}
