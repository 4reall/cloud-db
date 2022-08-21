import { Types, Schema, model } from "mongoose";
import { IFile, IFileModel } from "../types/File";
import { dateNow } from "../utils/helpers/dateNow";

const FileSchema = new Schema<IFile>({
	name: { type: String, required: true },
	type: { type: String, required: true },
	accessLink: { type: String },
	size: { type: Number, default: 1 },
	path: { type: String, default: "" },
	date: { type: String, default: dateNow() },
	userId: { type: Types.ObjectId, ref: "User" },
	parentId: { type: Types.ObjectId, ref: "File" },
	childrenIds: [{ type: Types.ObjectId, ref: "File" }],
});

export const File = model<IFile>("File", FileSchema);
