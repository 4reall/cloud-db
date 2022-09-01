import { Error } from "mongoose";
import { IFile } from "../types/File";
import { FILES_PATH } from "../utils/constants/env";
import fs from "fs";

class FileService {
	getFilePath(file: IFile) {
		return `${FILES_PATH}/${file.userId}/${file.path}`;
	}

	createDir(file: IFile) {
		const filePath = this.getFilePath(file);
		if (!fs.existsSync(filePath)) {
			fs.mkdirSync(filePath);
			return "Folder has been created";
		} else {
			throw new Error("Folder already exist");
		}
	}

	deleteFile(file: IFile) {
		const filePath = this.getFilePath(file);
		console.log(filePath);

		fs.rmSync(filePath);
	}
}

export default new FileService();
