import { IDir, IFile } from 'types/file/File';
import clsx from 'clsx';
import {
	CogIcon,
	FolderAddIcon,
	FolderIcon,
	DocumentIcon,
	DotsVerticalIcon,
} from '@heroicons/react/outline';
import Divider from 'components/_layout/Divider';
import { ComponentPropsWithoutRef, MouseEvent } from 'react';
import prettyBytes from 'pretty-bytes';
import FileDropdown from 'components/FileList/components/FileDropdown';

interface FileProps extends ComponentPropsWithoutRef<'div'> {
	file: Pick<IFile, 'type' | 'size' | 'name' | 'date' | '_id'>;
	// onOptionClick: () => void;
}

const File = ({ file, className, ...props }: FileProps) => {
	const { type, size, name, date, _id } = file;

	// const onClick = (e: MouseEvent<HTMLDivElement>) => {
	// 	if (type === 'dir') handleFolderClick(e, { name, _id });
	// };

	return (
		<div
			{...props}
			className={clsx(
				'h-14 rounded-lg bg-white p-2 text-black shadow-md',
				'grid cursor-pointer grid-cols-12 grid-rows-1 items-center justify-center',
				'duration-200 dark:bg-gray-700 dark:text-gray-200 md:dark:hover:bg-gray-700',
				'text-sm md:text-base md:hover:bg-gray-100 md:hover:dark:bg-opacity-70',
				className
			)}
			// onClick={onClick}
		>
			{type === 'dir' ? (
				<FolderIcon className="h-full w-full" />
			) : (
				<DocumentIcon className="h-full w-full" />
			)}
			<span className="col-start-2 col-end-8 ml-3 inline-block overflow-x-hidden md:col-end-7">
				{name}
			</span>
			<div className="col-start-7 col-end-10 mx-auto hidden h-full w-full items-center justify-between md:flex">
				<Divider className="mx-1" />
				<span className="mx-auto block text-center">{date}</span>
			</div>
			<div className="col-start-8 col-end-11 mx-auto flex h-full w-full items-center justify-between md:col-start-10 md:col-end-12">
				<Divider className="mx-1" />
				<span className="mx-auto block text-center">
					{prettyBytes(size)}
				</span>
				<Divider className="mx-1" />
			</div>
		</div>
	);
};

export default File;
