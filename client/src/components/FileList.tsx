import File from 'components/File';
import { IFile } from 'types/file/File';

type FileListProps = { files: IFile[] };

const FileList = ({ files }: FileListProps) => {
	return (
		<div>
			<div className="grid grid-cols-12 p-2 text-black dark:text-gray-200">
				<span className="col-span-2 text-center">Title</span>
				<span className="col-span-2 col-end-11 text-center">Date</span>
				<span className="col-span-1 col-end-13 text-center">Size</span>
			</div>
			{files.map(({ _id, ...props }) => (
				<File
					_id={_id}
					key={_id}
					className="mb-4 last:mb-0"
					{...props}
				/>
			))}
		</div>
	);
};

export default FileList;
