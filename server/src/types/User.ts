import { ObjectId, Document, Model } from "mongoose";
import { IFile } from "./File";

export interface IUser extends Document {
	_id: ObjectId;
	email: string;
	password: string;
	diskSpace: number;
	usedSpace: number;
	avatar: string;
	files: IFile[];
}

export interface IUserModel extends Model<IUser> {
	save(user: string): string;
}
