import { IUser } from 'types/user/User';

export interface IAuthResponse {
	token: string;
	user: IUser;
}
