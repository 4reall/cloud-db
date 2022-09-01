import IconButton from 'components/_ui/_buttons/IconButton';
import {
	DocumentDownloadIcon,
	DocumentRemoveIcon,
	DotsVerticalIcon,
	FolderDownloadIcon,
	FolderRemoveIcon,
} from '@heroicons/react/outline';
import Dropdown from 'components/_ui/Dropdown/Dropdown';
import { useState, MouseEvent, useRef } from 'react';
import clsx from 'clsx';
import RoundButton from 'components/_ui/_buttons/RoundButton';
import { useClickOutside } from 'hooks/useClickOutside';
import Overlay from 'components/_layout/Overlay';

interface FileDropdownProps {
	fileType: string;
}

const FileDropdown = ({ fileType }: FileDropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const handleToggle = () => {
		setIsOpen(!isOpen);
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
					icon={
						fileType === 'dir' ? (
							<FolderRemoveIcon />
						) : (
							<DocumentRemoveIcon />
						)
					}
					label="remove"
					full
				/>
				<IconButton
					icon={
						fileType === 'dir' ? (
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
