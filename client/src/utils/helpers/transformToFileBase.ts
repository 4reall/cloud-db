import { IFileBase } from 'types/file/File';

export const transformToFileBase = (file: File) => {
	const name = file.name.split('.');
	return {
		name: file.name,
		size: file.size,
		type: name[name.length - 1],
	};
};
