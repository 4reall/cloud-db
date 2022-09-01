import { IFile } from 'types/file/File';

export interface IFileQuery {
	name?: string;
	parentId?: IFile['_id'];
	_id?: IFile['_id'];
}
