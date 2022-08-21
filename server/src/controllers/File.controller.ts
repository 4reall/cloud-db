import { Response } from "express";

import { File } from "../models/File.model";
import FileService from "../services/File.service";
import { IBaseRequest } from "../types/BaseRequest";
import { IFileQueries, FileRequest } from "../types/FileRequest";

class FileController {
	async createDir(req: IBaseRequest<FileRequest>, res: Response) {
		try {
			const { parentId, type, name } = req.body;

			const file = new File({
				name,
				type,
				parentId,
				userId: req.user.id,
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

	async getFiles(
		req: IBaseRequest<FileRequest, IFileQueries>,
		res: Response
	) {
		try {
			const files = await File.find({
				userId: req.user.id,
				parentId: req.query.parentId,
			});
			return res.json(files);
		} catch (e) {
			console.log(e);
			return res.status(500).json({ message: e.message });
		}
	}
}

export default new FileController();
