import Breadcrumbs from 'components/_ui/Breadcrumbs';
import IconButton from 'components/_ui/_buttons/IconButton';
import {
	ArrowCircleLeftIcon,
	DocumentAddIcon,
	FolderAddIcon,
} from '@heroicons/react/outline';
import { IDir } from 'types/file/File';
import { MouseEvent } from 'react';

interface HeaderProps {
	big: boolean;
	dirStack: IDir[];
	handleBack: () => void;
	handleMoveToFolder: (dir: IDir) => void;
	openAddFolderModal: () => void;
	openUploadFileModal: () => void;
}

const Header = ({
	big,
	dirStack,
	handleBack,
	handleMoveToFolder,
	openAddFolderModal,
	openUploadFileModal,
}: HeaderProps) => {
	return (
		<div className="flex flex-1 items-center justify-between">
			{big ? (
				<Breadcrumbs>
					{dirStack.map((dir, i) => (
						<span
							key={dir._id}
							onClick={() => {
								// do nothing if the last folder
								i !== dirStack.length - 1 &&
									handleMoveToFolder(dir);
							}}
						>
							{dir.name}
						</span>
					))}
				</Breadcrumbs>
			) : (
				<IconButton
					onClick={handleBack}
					className="flex-shrink-0 p-2 text-sm md:text-base"
					icon={<ArrowCircleLeftIcon />}
					label="Back"
					disabled={dirStack.length < 2}
					ripple
				/>
			)}
			<div className="flex flex-col md:flex-row md:items-center md:justify-between">
				<IconButton
					onClick={openAddFolderModal}
					className="flex-shrink-0 p-2 text-sm md:text-base"
					icon={<FolderAddIcon />}
					label="Add folder"
					ripple
				/>
				<IconButton
					onClick={openUploadFileModal}
					className="flex-shrink-0 p-2 text-sm md:text-base"
					icon={<DocumentAddIcon />}
					label="Add file"
					ripple
				/>
			</div>
		</div>
	);
};

export default Header;
