import { IFile } from "../types/IFile";
import { FILES_URL } from "../utils/constants/env";
import fs from "fs";

class FileService {
	async createDir(file: IFile) {
		const filePath = `${FILES_URL}/${file.user}/${file.path}`;
		try {
			if (!fs.existsSync(filePath)) {
				fs.mkdirSync(filePath);
				return "File has been created";
			} else {
				return new Error("File already exist");
			}
		} catch (e) {
			throw new Error(`File error: ${e.message}`);
		}
	}
}

export default new FileService();
