import Page from 'components/_layout/Page';
import {
	useCreateDirMutation,
	useGetFilesQuery,
} from 'api/endpoints/file.endpoints';
import Button from 'components/_ui/Button';
import FileList from 'components/FileList';
import { useEffect } from 'react';
import Breadcrumbs from 'components/_ui/Breadcrumbs/Breadcrumbs';
import Divider from 'components/_layout/Divider';
import { useAppSelector } from 'hooks/redux';
import IconButton from 'components/_ui/IconButton';
import { FolderAddIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import Spinner from 'components/_ui/Spinner';
import { useDispatch } from 'react-redux';
import { toggleModal } from 'store/reducer/modal.slice';
import AddFileModal from 'components/_modals/AddFile.modal';
import useMediaQuery from 'hooks/useMediaQuery';
import { queries } from 'utils/constants/queries';
import {
	popFromStack,
	pushToStack,
	setCurrentDir,
} from 'store/reducer/file.slice';
import { IDir } from 'types/file/File';

const DiskPage = () => {
	const { currentDir, dirStack } = useAppSelector((state) => state.file);
	const userId = useAppSelector((state) => state.user.currentUser?.user._id);
	const dispatch = useDispatch();
	const { data, isLoading, isFetching } = useGetFileQuery(c);

	const loading = isLoading || isFetching;
	const isData = data && data.length > 0;

	useEffect(() => {
		const handleContext = (e: MouseEvent) => e.preventDefault();
		document.addEventListener('contextmenu', handleContext);

		return () => {
			document.removeEventListener('contextmenu', handleContext);
		};
	}, []);

	useEffect(() => {
		if (userId) {
			dispatch(pushToStack({ _id: userId, name: 'My drive' }));
			console.log(123);
			// dispatch(pushToStack({ _id: userId, n }));
		}
	}, [userId]);

	const openModal = () => {
		dispatch(toggleModal());
	};

	const handleMoveToFolder = (dir: IDir) => {
		return () => {
			dispatch(setCurrentDir(dir));
			dispatch(popFromStack(dir._id));
		};
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
					onClick={openModal}
					className="p-2"
					icon={<FolderAddIcon />}
					label="Add file"
					ripple
				/>
			</div>
			<Divider className="my-2" align="horizontal" />
			{loading ? (
				<Spinner
					size="xl"
					className="mx-auto mt-4 border-black dark:border-gray-200"
				/>
			) : isData ? (
				<FileList files={data} />
			) : (
				<span
					className={clsx(
						'mx-auto mt-4 block w-fit text-3xl text-black dark:text-gray-200'
					)}
				>
					There are not files here yet
				</span>
			)}
			<AddFileModal />
		</Page>
	);
};

export default DiskPage;
