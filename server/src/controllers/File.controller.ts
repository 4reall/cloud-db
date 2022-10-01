import { Request, Response } from "express";
import fs from "fs";

import { File } from "../models/File.model";
import { User } from "../models/User.model";
import FileService from "../services/File.service";
import { IBaseRequest } from "../types/BaseRequest";
import { FileRequestBody, IFileQueries } from "../types/FileRequestBody";
import { FILES_PATH } from "../utils/constants/env";
import { SortOptions } from "../utils/constants/SortOptions";

class FileController {
	async createDir(req: IBaseRequest<FileRequestBody>, res: Response) {
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

	async getFiles(req: IBaseRequest<{}, IFileQueries>, res: Response) {
		try {
			const { sortBy, order } = req.query;
			let files = null;

			const validOrder = order === -1 || order === 1 ? order : 1;

			switch (sortBy) {
				case SortOptions.Name:
					files = await File.find({
						userId: req.user._id,
						parentId: req.query.parentId,
					}).sort({ name: validOrder });
					break;
				case SortOptions.Type:
					files = await File.find({
						userId: req.user._id,
						parentId: req.query.parentId,
					}).sort({ type: validOrder });
					break;
				case SortOptions.Size:
					files = await File.find({
						userId: req.user._id,
						parentId: req.query.parentId,
					}).sort({ size: validOrder });
					break;
				default:
					files = await File.find({
						userId: req.user._id,
						parentId: req.query.parentId,
					});
					break;
			}

			return res.json(files);
		} catch (e) {
			console.log(e);
			return res.status(500).json({ message: e.message });
		}
	}

	async uploadFile(req: IBaseRequest<FileRequestBody>, res: Response) {
		try {
			const file = req.files.file;

			if (Array.isArray(file)) {
				return res
					.status(400)
					.json({ message: "Single file expected" });
			}

			const parent = await File.findOne({
				user: req.user._id,
				_id: req.body.parentId,
			});
			const user = await User.findOne({
				_id: req.user._id,
			});

			if (user.diskSpace < file.size + user.usedSpace) {
				return res
					.status(400)
					.json({ message: "Not enough space on disk" });
			}

			user.usedSpace += file.size;

			let absolutePath;
			let path;

			if (parent) {
				absolutePath = `${FILES_PATH}/${user._id}/${parent.path}/${file.name}`;
				path = `${parent.path}/${file.name}`;
			} else {
				absolutePath = `${FILES_PATH}/${user._id}/${file.name}`;
				path = file.name;
			}

			if (fs.existsSync(absolutePath)) {
				return res
					.status(400)
					.json({ message: "File with such name already exist" });
			}

			await file.mv(absolutePath);

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
			return res.status(500).json({ message: "Uploading error" });
		}
	}

	async downloadFile(req: IBaseRequest<null, IFileQueries>, res: Response) {
		try {
			const file = await File.findOne({
				_id: req.query._id,
				userId: req.user._id,
			});
			const path = `${FILES_PATH}/${req.user._id}/${file.path}`;

			if (fs.existsSync(path)) {
				return res.download(path, file.name);
			}

			return res.status(400).json({ message: "File does not exist" });
		} catch (e) {
			console.log(e);
			return res.status(500).json({ message: "Downloading error" });
		}
	}

	async deleteFile(req: IBaseRequest<null, IFileQueries>, res: Response) {
		try {
			const file = await File.findOne({
				_id: req.query._id,
				userId: req.user._id,
			});

			if (!file) {
				return res.status(400).json({
					message: "File does not exist",
				});
			}
			FileService.deleteFile(file);
			file.remove();

			return res.json({ message: "Successfully deleted" });
		} catch (e) {
			console.log(e);
			return res.status(500).json({ message: "Deleting error" });
		}
	}
}

export default new FileController();
