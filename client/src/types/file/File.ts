import { IUser } from 'types/user/User';

export interface IFile {
	_id: string;
	name: string;
	type: string;
	accessLink: string;
	path: string;
	size: number;
	date: string;
	userId: IUser['_id'];
}

export type IDir = Pick<IFile, '_id' | 'name'>;
