import { IUser } from 'types/user/User';

export interface IFileBase {
	size: number;
	name: string;
	type: string;
}

export interface IFile extends IFileBase {
	_id: string;
	accessLink: string;
	path: string;
	date: string;
	userId: IUser['_id'];
}

export type IDir = Pick<IFile, '_id' | 'name'>;
