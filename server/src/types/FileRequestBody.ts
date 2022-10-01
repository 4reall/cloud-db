import { SortOptions } from "../utils/constants/SortOptions";
import { IFile } from "./File";

export type FileRequestBody = Pick<IFile, "name" | "parentId" | "type">;

export interface IFileQueries {
	parentId?: string;
	_id?: string;
	sortBy?: SortOptions;
	order?: number;
}
