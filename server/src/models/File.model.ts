import { Types, Schema, model } from "mongoose";
import { IFile, IFileModel } from "../types/IFile";

const fileSchema = new Schema<IFile>({
	name: { type: String, required: true },
	type: { type: String, required: true },
	accessLink: { type: String },
	size: { type: Number, default: 1 },
	path: { type: String, default: "" },
	user: { type: Types.ObjectId, ref: "User" },
	parent: { type: Types.ObjectId, ref: "File" },
	children: [{ type: Types.ObjectId, ref: "File" }],
});

export const File = model<IFile, IFileModel>("File", fileSchema);
