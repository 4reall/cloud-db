import { Response } from "express";

import { File } from "../models/File.model";
import FileService from "../services/File.service";
import { IBaseRequest } from "../types/IBaseRequest";
import { IFileQueries, IFileRequest } from "../types/IFileRequest";

class FileController {
	async createDir(req: IBaseRequest<IFileRequest>, res: Response) {
		try {
			const { parent, type, name } = req.body;

			const file = new File({ name, parent, type, user: req.user.id });
			const parentFile = await File.findOne({ _id: parent });

			if (!parentFile) {
				file.path = name;
				await FileService.createDir(file);
			} else {
				file.path = `${parentFile.path}/${file.name}`;
				await FileService.createDir(file);
				parentFile.children.push(file._id);
				await parentFile.save();
			}

			await file.save();

			return res.json(file);
		} catch (e) {
			console.log(e);
			return res.status(400).json(e);
		}
	}

	async getFiles(
		req: IBaseRequest<IFileRequest, IFileQueries>,
		res: Response
	) {
		try {
			const files = await File.find({
				user: req.user.id,
				parent: req.query.parent,
			});
			return res.json(files);
		} catch (e) {
			console.log(e);
			return res.status(500).json(e);
		}
	}
}

export default new FileController();
