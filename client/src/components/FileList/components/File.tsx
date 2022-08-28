import { IDir, IFile } from 'types/file/File';
import clsx from 'clsx';
import {
	CogIcon,
	FolderAddIcon,
	FolderIcon,
	DocumentIcon,
} from '@heroicons/react/outline';
import Divider from 'components/_layout/Divider';
import { ComponentPropsWithoutRef } from 'react';
import prettyBytes from 'pretty-bytes';

interface FileProps extends ComponentPropsWithoutRef<'div'> {
	file: Pick<IFile, 'type' | 'size' | 'name' | 'date'>;
}

const File = ({ file, className, ...props }: FileProps) => {
	// const { _id, type, size, name, date, userId, accessLink } = file;
	const { type, size, name, date } = file;
	// const dispatch = useAppDispatch();

	return (
		<div
			{...props}
			className={clsx(
				'relative h-14 rounded-lg bg-white p-2 text-black shadow-md',
				'grid cursor-pointer grid-cols-12 grid-rows-1 items-center justify-center',
				'duration-200 dark:bg-gray-700 dark:text-gray-200 md:dark:hover:bg-gray-700',
				'text-sm md:text-base md:hover:bg-gray-100 md:hover:dark:bg-opacity-70',
				className
			)}
		>
			{type === 'dir' ? (
				<FolderIcon className="h-full w-full" />
			) : (
				<DocumentIcon className="h-full w-full" />
			)}
			<span className="col-span-4 col-end-6 ml-3 inline-block overflow-x-hidden">
				{name}
			</span>
			<Divider className="col-end-8 mx-auto md:col-end-9" />
			<span className="col-span-3 col-end-11 text-center md:col-span-2">
				{date}
			</span>
			<Divider className="col-end-12 mx-auto" />
			<span className="col-span-1 col-end-13 text-center">
				{prettyBytes(size)}
			</span>
		</div>
	);
};

export default File;
