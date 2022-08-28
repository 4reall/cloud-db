import clsx from 'clsx';
import { FieldPath, useFormContext } from 'react-hook-form';
import ValidationError from 'components/_layout/ValidationError';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

interface InputFieldProps<TForm> extends ComponentPropsWithoutRef<'input'> {
	name: FieldPath<TForm>;
	label: string | ReactNode;
	big?: boolean;
	errorMessage?: string;
	validation?: boolean;
}

const InputField = <IForm,>({
	name,
	label,
	validation = true,
	big,
	errorMessage,
	...props
}: InputFieldProps<IForm>) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	const error = errors[name]?.message as string;

	return (
		<>
			<label
				className={clsx(
					'inline-block text-gray-600 dark:text-white',
					big ? 'text-xl' : 'text-sm'
				)}
				htmlFor={name}
			>
				{label}
			</label>
			<input
				{...props}
				{...register(name)}
				className={clsx(
					'w-full appearance-none overflow-hidden outline-none',
					'rounded-lg border-transparent bg-gray-100 py-2 px-4',
					'text-gray-600 focus:outline-none focus:ring-blue-700',
					big ? 'mt-3 text-xl ring-4' : 'mt-1 ring-2',
					errorMessage ? 'ring-red-500' : 'ring-gray-400'
				)}
				id={name}
			/>
			{validation && (
				<ValidationError message={errorMessage || error} big={big} />
			)}
		</>
	);
};

export default InputField;
