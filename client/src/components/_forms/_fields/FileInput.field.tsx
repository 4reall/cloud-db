import { FieldPath, useController, useFormContext } from 'react-hook-form';
import { ChangeEvent, useEffect, useRef, useState, DragEvent } from 'react';
import { CloudUploadIcon, DocumentRemoveIcon } from '@heroicons/react/outline';
import { assignRefs } from 'utils/helpers/assignRef';
import clsx from 'clsx';
import ValidationError from 'components/_layout/ValidationError';
import RoundButton from 'components/_ui/_buttons/RoundButton';
import prettyBytes from 'pretty-bytes';
import File from 'components/FileList/components/File';

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
	...props
}: FileInputFieldProps<TForm>) => {
	const [val, setVal] = useState<File[]>([]);
	const [isDragging, setIsDragging] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const {
		control,
		resetField,
		formState: { errors },
	} = useFormContext();
	const {
		field: { onChange, ref, onBlur },
	} = useController({ name, control });

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		console.log(123);
		const files = e.target.files;
		if (!files) return;
		setVal(Object.values(files));
		onChange(Object.values(files));
	};

	const removeFile = (file: File) => () => {
		const newList = [...val];
		const dt = new DataTransfer();

		newList.splice(val.indexOf(file), 1);
		newList.forEach((val) => dt.items.add(val));

		setVal(newList);
		inputRef.current!.files = dt.files;
	};

	const handleDragEnter = (e: DragEvent<HTMLInputElement>) => {
		// e.preventDefault();
		setIsDragging(true);
	};
	const handleDragLeave = (e: DragEvent<HTMLInputElement>) => {
		// e.preventDefault();
		setIsDragging(false);
		// inputRef.current!.files = e.dataTransfer.files;
	};

	useEffect(() => {
		if (isSubmitting) {
			resetField(name);
			setVal([]);
		}
	}, [isSubmitting]);

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
			>
				<span className="block text-center text-base font-bold uppercase opacity-50 md:text-xl">
					Browse file to upload
				</span>
				<CloudUploadIcon className="mx-auto mt-4 h-16 w-16 md:h-24 md:w-24" />
				<input
					{...props}
					onBlur={onBlur}
					onChange={handleChange}
					onDragEnter={handleDragEnter}
					onDragLeave={handleDragLeave}
					onDragOver={handleDragEnter}
					onDrop={handleDragLeave}
					ref={assignRefs(ref, inputRef)}
					type="file"
					className="absolute top-0 left-0 h-full w-full opacity-0"
				/>
			</div>
			{val.map((file) => (
				<div className="text-bases flex w-full items-center justify-between px-4 py-2 md:text-lg">
					<div className="flex flex-col">
						<span className="">{file.name}</span>
						<span>{prettyBytes(file.size)}</span>
					</div>
					<RoundButton
						size={big ? 'md' : 'sm'}
						type="button"
						onClick={removeFile(file)}
					>
						<DocumentRemoveIcon className="text-red-600 md:hover:text-red-500" />
					</RoundButton>
				</div>
			))}
			<ValidationError />
		</>
	);
};

export default FileInputField;