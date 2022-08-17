import { ObjectId, Document, Model } from "mongoose";

export interface IFile extends Document {
	_id: ObjectId;
	name: string;
	type: string;
	accessLink: string;
	path: string;
	size: number;
	user: ObjectId;
	parent: ObjectId;
	children: ObjectId[];
}

export interface IFileModel extends Model<IFile> {
	save(file: string): string;
}
