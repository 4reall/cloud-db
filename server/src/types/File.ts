import { ObjectId, Document, Model } from "mongoose";
import { FileConfig } from "./FileConfig";

export interface IFile {
	_id: ObjectId;
	name: string;
	type: string;
	accessLink: string;
	path: string;
	size: number;
	date: string;
	userId: ObjectId;
	parentId: ObjectId;
	childrenIds: ObjectId[];
}
