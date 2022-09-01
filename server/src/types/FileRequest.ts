import { IFile } from "./File";

export type FileRequest = Pick<IFile, "name" | "parentId" | "type">;

export interface IFileQueries {
	parentId?: string;
	_id?: string;
}
