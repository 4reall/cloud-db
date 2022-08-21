import { IFile } from 'types/file/File';
import clsx from 'clsx';
import {
	CogIcon,
	FolderAddIcon,
	FolderIcon,
	FolderRemoveIcon,
} from '@heroicons/react/outline';
import Divider from 'components/_layout/Divider';
import { useState, MouseEvent, HTMLAttributes } from 'react';
import Dropdown from 'components/_ui/Dropdown/Dropdown';
import IconButton from 'components/_ui/IconButton';
import ContextMenu from 'components/ContextMenu';
import { useAppDispatch } from 'hooks/redux';
import { pushToStack, setCurrentDir } from 'store/reducer/file.slice';

type FileProps = IFile & HTMLAttributes<HTMLDivElement>;

const File = ({
	_id,
	type,
	size,
	name,
	date,
	className,
	userId,
	accessLink,
	...props
}: FileProps) => {
	const dispatch = useAppDispatch();

	const handleClick = () => {
		dispatch(setCurrentDir({ _id, name }));
		dispatch(pushToStack({ name, _id }));
	};

	return (
		<div
			className={clsx(
				'relative h-14 rounded-lg bg-white p-2 shadow-md',
				'grid grid-cols-12 grid-rows-1 items-center justify-center',
				className
			)}
			onClick={handleClick}
			{...props}
		>
			<div className="col-span-4 flex h-full w-full items-center text-black md:col-span-4">
				<FolderIcon className="h-full" />
				<span className="ml-3 inline-block">{name}</span>
			</div>
			<Divider className="col-end-9 mx-auto" />
			<span className="col-span-2 col-end-11 text-center">{date}</span>
			<Divider className="col-end-12 mx-auto" />
			<span className="col-span-1 col-end-13 text-center">{size}</span>
			<ContextMenu>
				<IconButton icon={<FolderRemoveIcon />} label="remove" />
				<IconButton icon={<FolderAddIcon />} label="add" />
			</ContextMenu>
		</div>
	);
};

export default File;
