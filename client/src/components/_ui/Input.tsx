import clsx from 'clsx';
import { FieldPath, useFormContext } from 'react-hook-form';
import ValidationError from 'components/_errors/ValidationError';
import { InputHTMLAttributes } from 'react';

type InputProps<IForm> = {
	name: FieldPath<IForm>;
	label: string;
	big?: boolean;
} & InputHTMLAttributes<{}>;

const Input = <IForm,>({ name, label, big, ...props }: InputProps<IForm>) => {
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
				className={clsx(
					'w-full appearance-none overflow-hidden outline-none',
					'rounded-lg border-transparent bg-gray-100 py-2 px-4',
					'text-gray-600 focus:outline-none focus:ring-blue-700',
					big ? 'mt-3 text-xl ring-4' : 'mt-1 ring-2',
					error ? 'ring-red-500' : 'ring-gray-400'
				)}
				id={name}
				{...register(name)}
				{...props}
			/>
			<ValidationError message={error} big={big} />
		</>
	);
};

export default Input;
