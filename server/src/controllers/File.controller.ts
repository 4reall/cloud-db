import { Response } from "express";
import fs from "fs";
import { HydratedDocument } from "mongoose";

import { File } from "../models/File.model";
import { User } from "../models/User.model";
import FileService from "../services/File.service";
import { IBaseRequest } from "../types/BaseRequest";
import { IFile } from "../types/File";
import { IFileQueries, FileRequest } from "../types/FileRequest";
import { IUser } from "../types/User";
import { FILES_PATH } from "../utils/constants/env";

class FileController {
	async createDir(req: IBaseRequest<FileRequest>, res: Response) {
		try {
			const { parentId, type, name } = req.body;

			const file = new File({
				name,
				type,
				parentId,
				userId: req.user._id,
			});
			const parentFile = await File.findOne({ _id: parentId });

			if (!parentFile) {
				file.path = name;
				FileService.createDir(file);
			} else {
				file.path = `${parentFile.path}/${file.name}`;
				FileService.createDir(file);
				parentFile.childrenIds.push(file._id);
				await parentFile.save();
			}

			await file.save();

			return res.json(file);
		} catch (e) {
			console.log(e.message);
			return res.status(400).json({ message: e.message });
		}
	}

	async getFiles(req: IBaseRequest<null, IFileQueries>, res: Response) {
		try {
			const files = await File.find({
				userId: req.user._id,
				parentId: req.query.parentId,
			});
			return res.json(files);
		} catch (e) {
			console.log(e);
			return res.status(500).json({ message: e.message });
		}
	}

	async uploadFile(req: IBaseRequest<FileRequest>, res: Response) {
		try {
			const file = req.files.file;

			if (Array.isArray(file)) {
				return res
					.status(400)
					.json({ message: "Single file expected" });
			}

			console.log(req.user._id, req.body.parentId);

			const parent = await File.findOne({
				user: req.user._id,
				_id: req.body.parentId,
			});
			const user = await User.findOne({
				_id: req.user._id,
			});

			if (user.diskSpace < file.size + user.usedSpace) {
				console.log(file.size, user.usedSpace, user.diskSpace);
				return res
					.status(400)
					.json({ message: "Not enough space on disk" });
			}

			user.usedSpace += file.size;

			let path;
			if (parent) {
				path = `${FILES_PATH}/${user._id}/${parent.path}/${file.name}`;
			} else {
				path = `${FILES_PATH}/${user._id}/${file.name}`;
			}

			if (fs.existsSync(path)) {
				return res
					.status(400)
					.json({ message: "File with such name already exist" });
			}

			await file.mv(path);

			const type = file.name.split(".").pop();

			const dbFile = new File({
				name: file.name,
				size: file.size,
				parentId: parent?._id,
				userId: user._id,
				type,
				path,
			});

			await dbFile.save();
			await user.save;

			return res.json(dbFile);
		} catch (e) {
			console.log(e);
			return res.status(500).json({ message: "Upload error" });
		}
	}
}

export default new FileController();
