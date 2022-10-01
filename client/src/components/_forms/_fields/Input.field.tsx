import clsx from 'clsx';
import { FieldPath, useFormContext } from 'react-hook-form';
import ValidationError from 'components/_layout/ValidationError';
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import Input from 'components/_ui/Input';

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
			<Input
				{...props}
				{...register(name)}
				isError={!!(errorMessage || error)}
				size={big ? 'md' : 'sm'}
				id={name}
				full
			/>
			{validation && (
				<ValidationError message={errorMessage || error} big={big} />
			)}
		</>
	);
};

export default InputField;
