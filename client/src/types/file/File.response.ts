import { IUser } from 'types/user/User';
import { IFile } from 'types/file/File';

export interface IFileResponse extends IFile {
	accessLink: string;
	userId: IUser['_id'];
	parentId: IFile['_id'];
	childrenIds: IFile['_id'][];
}
