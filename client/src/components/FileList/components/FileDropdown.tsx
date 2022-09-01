import IconButton from 'components/_ui/_buttons/IconButton';
import {
	DocumentDownloadIcon,
	DocumentRemoveIcon,
	DotsVerticalIcon,
	FolderDownloadIcon,
	FolderRemoveIcon,
} from '@heroicons/react/outline';
import Dropdown from 'components/_ui/Dropdown/Dropdown';
import { useState, MouseEvent, useRef, useEffect } from 'react';
import clsx from 'clsx';
import RoundButton from 'components/_ui/_buttons/RoundButton';
import { useClickOutside } from 'hooks/useClickOutside';
import Overlay from 'components/_layout/Overlay';
import {
	useDeleteFileMutation,
	useLazyDownloadFileQuery,
} from 'api/endpoints/file.endpoints';
import { IFile } from 'types/file/File';

interface FileDropdownProps {
	file: IFile;
}

const FileDropdown = ({ file }: FileDropdownProps) => {
	const [deleteFile, data] = useDeleteFileMutation();
	const [downloadFile, deleteResult] = useLazyDownloadFileQuery();
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const handleToggle = () => {
		setIsOpen(!isOpen);
	};
	const handleDelete = () => {
		deleteFile({ _id: file._id });
	};
	const handleDownload = () => {
		downloadFile({ _id: file._id, name: file.name });
	};

	useClickOutside(dropdownRef, () => setIsOpen(false));

	return (
		<>
			<Overlay isOpen={isOpen} backgroundOpacity={0} />
			<Dropdown
				trigger={
					<RoundButton
						className="ml-auto block"
						size="sm"
						onClick={handleToggle}
					>
						<DotsVerticalIcon className="h-full w-full" />
					</RoundButton>
				}
				className="z-10"
				color="bg-gray-100 dark:bg-gray-500"
				isOpen={isOpen}
				align="right"
				ref={dropdownRef}
			>
				<IconButton
					onClick={handleDelete}
					icon={
						file.type === 'dir' ? (
							<FolderRemoveIcon />
						) : (
							<DocumentRemoveIcon />
						)
					}
					label="remove"
					full
				/>
				<IconButton
					onClick={handleDownload}
					icon={
						file.type === 'dir' ? (
							<FolderDownloadIcon />
						) : (
							<DocumentDownloadIcon />
						)
					}
					label="download"
					full
				/>
			</Dropdown>
		</>
	);
};

export default FileDropdown;
