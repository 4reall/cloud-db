import BaseForm from 'components/_forms/Base.form';
import Button from 'components/_ui/_buttons/Button';
import { useUploadFileMutation } from 'api/endpoints/file.endpoints';
import { SubmitHandler } from 'react-hook-form';
import FileInputField from 'components/_forms/_fields/FileInput.field';
import { useAppSelector } from 'hooks/redux';

interface IUploadFileFrom {
	files: File[];
}

interface UploadFileFormProps {
	big?: boolean;
}

const UploadFileForm = ({ big }: UploadFileFormProps) => {
	const [trigger, result] = useUploadFileMutation();
	const parentId = useAppSelector((state) => state.file.currentDir?._id);

	const { isLoading } = result;

	const handleSubmit: SubmitHandler<IUploadFileFrom> = (data) => {
		if (!data.files) return;

		// Array.from(data.files).forEach((file) => {
		// 	const formData = new FormData();
		// 	if (parentId) formData.append('parentId', parentId);
		// 	formData.append('file', file);
		// 	trigger(formData);
		// });
		console.log(data);
	};

	return (
		<BaseForm<IUploadFileFrom> onSubmit={handleSubmit} reset>
			<FileInputField<IUploadFileFrom>
				name="files"
				multiple={true}
				isSubmitting={isLoading}
				big={big}
			/>
			<Button type={'submit'}>submit</Button>
		</BaseForm>
	);
};

export default UploadFileForm;
