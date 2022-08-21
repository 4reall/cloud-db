import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as Yup from 'yup';
import { PropsWithChildren } from 'react';

export interface BaseFormProps<TFrom> {
	onSubmit: (data: TFrom) => void;
	validationSchema?: ReturnType<typeof Yup.object>;
}

const BaseForm = <TForm,>({
	validationSchema,
	children,
	onSubmit,
}: PropsWithChildren<BaseFormProps<TForm>>) => {
	const methods = useForm<TForm>({
		mode: 'onTouched',
		reValidateMode: 'onChange',
		resolver: validationSchema ? yupResolver(validationSchema) : undefined,
		delayError: 150,
	});
	const { handleSubmit } = methods;

	return (
		<FormProvider {...methods}>
			<form onSubmit={handleSubmit(onSubmit)}>{children}</form>
		</FormProvider>
	);
};

export default BaseForm;
