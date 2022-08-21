import BaseModal from 'components/_modals/Base.modal';
import AddFolderForm from 'components/_forms/AddFolder/AddFolder.form';
import useMediaQuery from 'hooks/useMediaQuery';
import { queries } from 'utils/constants/queries';

const AddFileModal = () => {
	const isMd = useMediaQuery(queries.up.md);

	return (
		<BaseModal>
			<AddFolderForm big={isMd} />
		</BaseModal>
	);
};

export default AddFileModal;
