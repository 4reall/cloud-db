import { v4 as uuid } from 'uuid';
import { transformToFileBase } from 'utils/helpers/transformToFileBase';
import { FileConfig } from 'utils/constants/fileConfig';
import { IFileConfig } from 'types/FileConfig';
import prettyBytes from 'pretty-bytes';
import RoundButton from 'components/_ui/_buttons/RoundButton';
import { DocumentRemoveIcon } from '@heroicons/react/outline';
import { IFileBase } from 'types/file/File';

interface FileProps {
	removeFile: (file: File) => void;
	file: File;
	big?: boolean;
}

const File = ({ file, removeFile, big }: FileProps) => {
	const fileBase: IFileBase = transformToFileBase(file);
	return (
		<div className="grid w-full grid-cols-12 px-4 py-2 text-base md:text-lg">
			{fileBase.type in FileConfig
				? FileConfig[fileBase.type as keyof IFileConfig]
				: FileConfig.defaultFile}
			<span className="col-span-7 col-start-2 md:col-span-8">
				{file.name}
			</span>
			<span className="col-span-2 md:col-span-2 md:col-start-10">
				{prettyBytes(file.size)}
			</span>
			<RoundButton
				size={big ? 'md' : 'sm'}
				type="button"
				onClick={() => removeFile(file)}
				className="col-span-2"
			>
				<DocumentRemoveIcon className="text-red-600 md:hover:text-red-500" />
			</RoundButton>
		</div>
	);
};

export default File;
