import BaseForm from 'components/_forms/Base.form';
import InputField from 'components/_forms/_fields/Input.field';
import Button from 'components/_ui/_buttons/Button';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useCreateDirMutation } from 'api/endpoints/file.endpoints';
import { toggleAddFolderModal } from 'store/reducer/modal.slice';
import { isErrorWithMessage } from 'utils/helpers/validateError';
import { useEffect } from 'react';

interface IAddFolderForm {
	name: string;
}

const defaultValues: IAddFolderForm = {
	name: '',
};

interface AddFolderFormProps {
	big?: boolean;
}

const AddFolderForm = ({ big }: AddFolderFormProps) => {
	const dispatch = useAppDispatch();
	const currentDir = useAppSelector((state) => state.file.currentDir);
	const [createDir, result] = useCreateDirMutation();

	const { error, isSuccess, isLoading } = result;

	const errMsg = isErrorWithMessage(error) ? error.data.message : '';

	const onSubmit = (data: IAddFolderForm) => {
		createDir({ parentId: currentDir?._id, name: data.name });
	};

	useEffect(() => {
		if (isSuccess) dispatch(toggleAddFolderModal());
	}, [isSuccess]);

	return (
		<BaseForm<IAddFolderForm>
			onSubmit={onSubmit}
			defaultValues={defaultValues}
		>
			<InputField<IAddFolderForm>
				name="name"
				label="Folder name"
				errorMessage={errMsg}
				big={big}
			/>
			<Button
				className="mt-2"
				type="submit"
				big={big}
				loading={isLoading}
				disabled={isLoading}
			>
				add file
			</Button>
		</BaseForm>
	);
};

export default AddFolderForm;
