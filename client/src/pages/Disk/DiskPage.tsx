import Page from 'components/_layout/Page';
import { useGetFilesQuery } from 'api/endpoints/file.endpoints';
import FileList from 'components/FileList/FileList';
import { useEffect, MouseEvent } from 'react';
import Divider from 'components/_layout/Divider';
import { useAppSelector } from 'hooks/redux';
import { useDispatch } from 'react-redux';
import {
	toggleAddFolderModal,
	toggleUploadFileModal,
} from 'store/reducer/modal.slice';
import AddFolderModal from 'components/_ui/_modals/AddFolder.modal';
import {
	sliceStack,
	pushToStack,
	setCurrentDir,
	clearStack,
	popFromStack,
} from 'store/reducer/file.slice';
import { IDir } from 'types/file/File';
import useMediaQuery from 'hooks/useMediaQuery';
import { queries } from 'utils/constants/queries';
import Header from 'pages/Disk/components/Header';
import UploadFileModal from 'components/_ui/_modals/UploadFile.modal';

const DiskPage = () => {
	const isMd = useMediaQuery(queries.up.md);

	const { currentDir, dirStack } = useAppSelector((state) => state.file);
	const userId = useAppSelector((state) => state.user.currentUser?.user._id);
	const dispatch = useDispatch();

	const { data, isLoading, isFetching } = useGetFilesQuery(
		currentDir?._id !== userId ? currentDir?._id : ''
	);
	const loading = isLoading || isFetching;

	useEffect(() => {
		// set root folder name to breadcrumbs
		dispatch(pushToStack({ _id: '', name: 'My drive' }));

		return () => {
			dispatch(clearStack());
			dispatch(setCurrentDir(null));
		};
	}, []);

	const openAddFolderModal = () => dispatch(toggleAddFolderModal());
	const openUploadFileModal = () => dispatch(toggleUploadFileModal());

	const handleMoveToFolder = (dir: IDir) => {
		dispatch(setCurrentDir(dir));
		dispatch(sliceStack(dir._id));
	};

	const handleBack = () => {
		// if it is not the root folder, then pop folder for stack and set previous as current
		if (dirStack.length > 1) {
			dispatch(setCurrentDir(dirStack[dirStack.length - 2]));
			dispatch(popFromStack());
		}
	};

	const handleFolderClick = (e: MouseEvent<HTMLDivElement>, dir: IDir) => {
		// if (e.target === e.currentTarget) {
		dispatch(setCurrentDir(dir));
		dispatch(pushToStack(dir));
		// }
	};

	return (
		<Page>
			<Header
				big={isMd}
				dirStack={dirStack}
				handleBack={handleBack}
				handleMoveToFolder={handleMoveToFolder}
				openAddFolderModal={openAddFolderModal}
				openUploadFileModal={openUploadFileModal}
			/>
			<Divider className="my-2" align="horizontal" />
			{data && (
				<FileList
					handleFolderClick={handleFolderClick}
					loading={loading}
					files={data}
				/>
			)}
			<UploadFileModal />
			<AddFolderModal />
		</Page>
	);
};

export default DiskPage;
