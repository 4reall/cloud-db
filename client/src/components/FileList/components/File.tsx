import { IDir, IFile } from 'types/file/File';
import clsx from 'clsx';
import {
	CogIcon,
	FolderAddIcon,
	FolderIcon,
	FolderRemoveIcon,
} from '@heroicons/react/outline';
import Divider from 'components/_layout/Divider';
import {
	useState,
	MouseEvent,
	HTMLAttributes,
	ReactNode,
	ComponentPropsWithoutRef,
} from 'react';
import Dropdown from 'components/_ui/Dropdown/Dropdown';
import IconButton from 'components/_ui/IconButton';
import ContextMenu from 'components/ContextMenu';
import { useAppDispatch } from 'hooks/redux';
import { pushToStack, setCurrentDir } from 'store/reducer/file.slice';

interface FileProps extends ComponentPropsWithoutRef<'div'> {
	file: IFile;
	contextActions?: {
		handleFileRemove: (dir: IDir) => () => void;
		// handleAddToFolder: (dir: IDir) => () => void;
	};
}

const File = ({ file, className, contextActions, ...props }: FileProps) => {
	const { _id, type, size, name, date, userId, accessLink } = file;
	// const dispatch = useAppDispatch();

	return (
		<div
			{...props}
			className={clsx(
				'relative h-14 rounded-lg bg-white p-2 shadow-md dark:bg-gray-800',
				'grid grid-cols-12 grid-rows-1 items-center justify-center ',
				'text-black duration-200 dark:text-gray-200 md:hover:dark:bg-opacity-70',
				className
			)}
		>
			<div className="col-span-4 flex h-full w-full items-center md:col-span-4">
				<FolderIcon className="h-full" />
				<span className="ml-3 inline-block">{name}</span>
			</div>
			<Divider className="col-end-9 mx-auto" />
			<span className="col-span-2 col-end-11 text-center">{date}</span>
			<Divider className="col-end-12 mx-auto" />
			<span className="col-span-1 col-end-13 text-center">{size}</span>
		</div>
	);
};

export default File;
