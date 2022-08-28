import BaseModal from 'components/_ui/_modals/Base.modal';
import AddFolderForm from 'components/_forms/AddFolder/AddFolder.form';
import useMediaQuery from 'hooks/useMediaQuery';
import { queries } from 'utils/constants/queries';
import { useAppDispatch } from 'hooks/redux';
import { toggleAddFolderModal } from 'store/reducer/modal.slice';

const AddFolderModal = () => {
	const isLg = useMediaQuery(queries.up.lg);
	const dispatch = useAppDispatch();

	const handleToggle = () => {
		dispatch(toggleAddFolderModal());
	};

	return (
		<BaseModal toggleModal={handleToggle} modal="isAddFolderModal">
			<AddFolderForm big={isLg} />
		</BaseModal>
	);
};

export default AddFolderModal;
