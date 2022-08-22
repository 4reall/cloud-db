import { Transition } from '@headlessui/react';
import { IDir, IFile } from 'types/file/File';
import Spinner from 'components/_ui/Spinner';
import Header from 'components/FileList/components/Header';
import ContextMenu from 'components/ContextMenu';
import IconButton from 'components/_ui/IconButton';
import { FolderAddIcon, FolderRemoveIcon } from '@heroicons/react/outline';
import File from 'components/FileList/components/File';

interface FileListProps {
	files: IFile[];
	loading: boolean;
	handleFolderClick: (dir: IDir) => () => void;
	contextActions?: {
		handleFileRemove: (dir: IDir) => () => void;
		// handleAddToFolder: (dir: IDir) => () => void;
	};
}

const FileList = ({
	files,
	loading,
	handleFolderClick,
	contextActions,
}: FileListProps) => {
	if (loading)
		return (
			<>
				<Header />
				<Spinner
					size="xl"
					className="mx-auto mt-4 border-black dark:border-gray-200"
				/>
			</>
		);

	if (files.length < 1)
		return (
			<>
				<Header />
				<span className="mx-auto mt-4 block w-fit text-3xl text-black dark:text-gray-200">
					There are not files here yet
				</span>
			</>
		);

	return (
		<>
			<Header />
			{files.map((file) => (
				<Transition
					key={file._id}
					className="relative mb-4 last:mb-0"
					appear
					enter="transition-opacity duration-200"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity duration-300"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
					show
				>
					<File
						file={file}
						onClick={handleFolderClick({
							_id: file._id,
							name: file.name,
						})}
						// contextActions={contextActions}
					/>
					{contextActions && (
						<ContextMenu>
							<IconButton
								icon={<FolderRemoveIcon />}
								label="remove"
								onClick={contextActions.handleFileRemove({
									_id: file._id,
									name: file.name,
								})}
							/>
							<IconButton
								icon={<FolderAddIcon />}
								label="add"
								onClick={contextMenu.handleAddToFolder({
									_id: file._id,
									name: file.name,
								})}
							/>
						</ContextMenu>
					)}
				</Transition>
			))}
		</>
	);
};

export default FileList;
