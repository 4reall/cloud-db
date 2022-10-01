import useMediaQuery from 'hooks/useMediaQuery';
import { queries } from 'utils/constants/queries';
import BaseModal from 'components/_ui/_modals/Base.modal';
import UploadForm from 'components/_forms/Upload/Upload.form';
import { useAppDispatch } from 'hooks/redux';
import { toggleUploadFileModal } from 'store/reducer/modal.slice';

const UploadFileModal = () => {
	const isMd = useMediaQuery(queries.up.md);
	const dispatch = useAppDispatch();

	const handleToggle = () => {
		dispatch(toggleUploadFileModal());
	};

	return (
		<BaseModal toggleModal={handleToggle} modal="isUploadFileModal">
			<UploadForm big={isMd} />
		</BaseModal>
	);
};

export default UploadFileModal;
