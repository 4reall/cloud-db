import { ObjectId, Document, Model } from "mongoose";
import { IFile } from "./File";

export interface IUser {
	_id: ObjectId;
	email: string;
	password: string;
	diskSpace: number;
	usedSpace: number;
	avatar: string;
	files: IFile[];
}
