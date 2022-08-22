import Page from 'components/_layout/Page';
import {
	useCreateDirMutation,
	useGetFilesQuery,
} from 'api/endpoints/file.endpoints';
import Button from 'components/_ui/Button';
import FileList from 'components/FileList/FileList';
import { useEffect, useRef } from 'react';
import Breadcrumbs from 'components/_ui/Breadcrumbs';
import Divider from 'components/_layout/Divider';
import { useAppSelector } from 'hooks/redux';
import IconButton from 'components/_ui/IconButton';
import { FolderAddIcon, FolderRemoveIcon } from '@heroicons/react/outline';
import { useDispatch } from 'react-redux';
import { toggleModal } from 'store/reducer/modal.slice';
import AddFileModal from 'components/_modals/AddFile.modal';
import {
	sliceStack,
	pushToStack,
	setCurrentDir,
	clearStack,
} from 'store/reducer/file.slice';
import { IDir } from 'types/file/File';
import ContextMenu from 'components/ContextMenu';

const DiskPage = () => {
	const { currentDir, dirStack } = useAppSelector((state) => state.file);
	const userId = useAppSelector((state) => state.user.currentUser?.user._id);
	const dispatch = useDispatch();
	const { data, isLoading, isFetching } = useGetFilesQuery(
		currentDir?._id !== userId ? currentDir?._id : ''
	);

	const loading = isLoading || isFetching;

	useEffect(() => {
		const handleContext = (e: MouseEvent) => e.preventDefault();
		document.addEventListener('contextmenu', handleContext);

		dispatch(pushToStack({ _id: '', name: 'My drive' }));

		return () => {
			document.removeEventListener('contextmenu', handleContext);
			dispatch(clearStack());
			dispatch(setCurrentDir(null));
		};
	}, []);

	const openModal = () => () => {
		dispatch(toggleModal());
	};

	const handleMoveToFolder = (dir: IDir) => () => {
		dispatch(setCurrentDir(dir));
		dispatch(sliceStack(dir._id));
	};

	const handleFolderClick = (dir: IDir) => () => {
		console.log(dir);
		dispatch(setCurrentDir(dir));
		dispatch(pushToStack(dir));
	};

	return (
		<Page>
			<div className="flex flex-1 items-center justify-between">
				<Breadcrumbs>
					{dirStack.map((dir, i) => (
						<span
							key={dir._id}
							onClick={
								i !== dirStack.length - 1
									? handleMoveToFolder(dir)
									: undefined
							}
						>
							{dir.name}
						</span>
					))}
				</Breadcrumbs>
				<IconButton
					onClick={openModal()}
					className="p-2"
					icon={<FolderAddIcon />}
					label="Add file"
					ripple
				/>
			</div>
			<Divider className="my-2" align="horizontal" />
			{data && (
				<FileList
					handleFolderClick={handleFolderClick}
					loading={loading}
					files={data}
					contextActions={{
						handleFileRemove: () => () => {},
						// handleAddToFolder: () => () => {},
					}}
				/>
			)}
			<AddFileModal />
		</Page>
	);
};

export default DiskPage;
