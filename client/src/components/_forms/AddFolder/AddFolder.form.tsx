import BaseForm from 'components/_forms/Base.form';
import InputField from 'components/_forms/Input.field';
import Button from 'components/_ui/Button';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useCreateDirMutation } from 'api/endpoints/file.endpoints';
import { toggleModal } from 'store/reducer/modal.slice';
import { isErrorWithMessage } from 'utils/helpers/validateError';
import { useEffect } from 'react';

interface IAddFolderForm {
	name: string;
}

interface AddFolderFormProps {
	big?: boolean;
}

const AddFolderForm = ({ big }: AddFolderFormProps) => {
	const dispatch = useAppDispatch();
	const currentDir = useAppSelector((state) => state.file.currentDir);
	const [createDir, result] = useCreateDirMutation();

	const { error, isSuccess } = result;

	const errMsg = isErrorWithMessage(error) ? error.data.message : '';

	const onSubmit = (data: IAddFolderForm) => {
		createDir({ parentId: currentDir?._id, name: data.name });
	};

	useEffect(() => {
		if (isSuccess) dispatch(toggleModal());
	}, [isSuccess]);

	return (
		<BaseForm<IAddFolderForm> onSubmit={onSubmit}>
			<InputField<IAddFolderForm>
				name="name"
				label="Folder name"
				customError={errMsg}
				big={big}
			/>
			<Button className="mt-2" type="submit" big={big}>
				add file
			</Button>
		</BaseForm>
	);
};

export default AddFolderForm;