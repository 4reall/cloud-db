import { IDir, IFile, IFileBase } from 'types/file/File';
import clsx from 'clsx';
import Divider from 'components/_layout/Divider';
import { ComponentPropsWithoutRef } from 'react';
import prettyBytes from 'pretty-bytes';
import { IFileConfig } from 'types/FileConfig';
import { FileConfig } from 'utils/constants/fileConfig';

interface FileProps extends ComponentPropsWithoutRef<'div'> {
	file: IFileBase & Partial<Pick<IFile, 'date'>>;
}

const File = ({ file, className, children, ...props }: FileProps) => {
	const { type, size, name, date } = file;

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
		>
			{type in FileConfig
				? FileConfig[type as keyof IFileConfig]
				: FileConfig.defaultFile}
			<span className="col-start-2 col-end-8 ml-3 inline-block overflow-x-hidden truncate md:col-end-7">
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
