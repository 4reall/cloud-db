import { FieldPath, useController, useFormContext } from 'react-hook-form';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { CloudUploadIcon } from '@heroicons/react/outline';
import { assignRefs } from 'utils/helpers/assignRef';
import clsx from 'clsx';
import ValidationError from 'components/_layout/ValidationError';
import Spinner from 'components/_ui/Spinner';
import File from 'components/_forms/_fields/FileInput/File';
import { v4 as uuid } from 'uuid';

interface FileInputFieldProps<TForm> {
	name: FieldPath<TForm>;
	errorMessage?: string;
	big?: boolean;
	multiple?: boolean;
	isSubmitting?: boolean;
}

const FileInputField = <TForm,>({
	name,
	isSubmitting,
	big,
	errorMessage,
	...props
}: FileInputFieldProps<TForm>) => {
	const [files, setFiles] = useState<File[]>([]);
	const [isDragging, setIsDragging] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const { control, resetField } = useFormContext();

	const {
		field: { onChange, ref, onBlur },
	} = useController({ name, control });

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const targetFiles = e.target.files;
		if (!targetFiles) return;

		setFiles(Object.values(targetFiles));
		onChange(Object.values(targetFiles));
	};

	const removeFile = (file: File) => {
		const newList = [...files];
		const dt = new DataTransfer();

		newList.splice(newList.indexOf(file), 1);
		newList.forEach((file) => dt.items.add(file));

		setFiles(newList);
		inputRef.current!.files = dt.files;
	};

	const handleDragEnter = () => setIsDragging(true);

	const handleDragLeave = () => setIsDragging(false);

	useEffect(() => {
		if (isSubmitting) {
			resetField(name);
			setFiles([]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSubmitting, name]);

	return (
		<>
			<div
				className={clsx(
					'relative mx-auto mt-2 w-full rounded-3xl',
					'border-[3px] border-dashed p-4 transition-all duration-300',
					isDragging
						? 'border-blue-700 text-blue-700 dark:border-blue-500 dark:text-blue-500'
						: 'base__color border-black dark:border-gray-200'
				)}
				onDragLeave={handleDragLeave}
				onDragOver={handleDragEnter}
				onDrop={handleDragLeave}
			>
				<span className="block text-center text-base font-bold uppercase opacity-50 md:text-xl">
					Browse file to upload
				</span>
				{isSubmitting ? (
					<Spinner
						size="xl"
						className="mx-auto mt-4 border-blue-700 dark:border-gray-200"
					/>
				) : (
					<CloudUploadIcon className="mx-auto mt-4 h-16 w-16 md:h-24 md:w-24" />
				)}
				<input
					{...props}
					onBlur={onBlur}
					onChange={handleChange}
					ref={assignRefs(ref, inputRef)}
					type="file"
					className="absolute top-0 left-0 h-full w-full opacity-0"
				/>
			</div>
			<div className="my-4 max-h-48 overflow-y-scroll">
				{files.map((file) => (
					<File
						key={uuid()}
						removeFile={removeFile}
						file={file}
						big={big}
					/>
				))}
			</div>
			{errorMessage && (
				<ValidationError
					size={big ? 'md' : 'sm'}
					message={errorMessage}
				/>
			)}
		</>
	);
};

export default FileInputField;
