import { IUserResponse } from 'types/user/User.response';
import { IFile } from 'types/file/File';

export interface IUser {
	_id: string;
	email: string;
	password: string;
	diskSpace: number;
	usedSpace: number;
	avatar: string;
	files: IFile['_id'][];
}
