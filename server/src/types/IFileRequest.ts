import { IFile } from "./IFile";

export type IFileRequest = Pick<IFile, "name" | "parent" | "type">;

export interface IFileQueries {
	parent?: string;
}
