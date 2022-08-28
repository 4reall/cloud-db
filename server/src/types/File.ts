import { ObjectId, Document, Model } from "mongoose";

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
