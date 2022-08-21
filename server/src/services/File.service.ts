import { Error } from "mongoose";
import { IFile } from "../types/File";
import { FILES_URL } from "../utils/constants/env";
import fs from "fs";

class FileService {
	createDir(file: IFile) {
		const filePath = `${FILES_URL}/${file.userId}/${file.path}`;
		if (!fs.existsSync(filePath)) {
			fs.mkdirSync(filePath);
			return "Folder has been created";
		} else {
			throw new Error("Folder already exist");
		}
	}
}

export default new FileService();
