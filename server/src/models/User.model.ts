import { Schema, Types, model } from "mongoose";
import { IUser } from "../types/User";

const UserSchema = new Schema<IUser>({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	usedSpace: { type: Number, required: true, default: 0 },
	diskSpace: { type: Number, required: true, default: 1024 * 100 },
	avatar: { type: String },
	files: [{ type: Types.ObjectId, ref: "File" }],
});

export const User = model<IUser>("Users", UserSchema);
