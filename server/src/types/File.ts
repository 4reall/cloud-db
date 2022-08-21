import { ObjectId, Document, Model } from "mongoose";

export interface IFile extends Document {
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

export interface IFileModel extends Model<IFile> {
	save(file: string): string;
}
