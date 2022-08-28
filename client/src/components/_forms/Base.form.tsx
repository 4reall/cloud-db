import {
	DefaultValues,
	FormProvider,
	SubmitHandler,
	useForm,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as Yup from 'yup';
import { FormEvent, PropsWithChildren } from 'react';

export interface BaseFormProps<TFrom> {
	onSubmit: SubmitHandler<TFrom>;
	validationSchema?: ReturnType<typeof Yup.object>;
	defaultValues?: DefaultValues<TFrom>;
	reset?: boolean;
}

const BaseForm = <TForm,>({
	validationSchema,
	children,
	onSubmit,
	defaultValues,
	reset,
}: PropsWithChildren<BaseFormProps<TForm>>) => {
	const methods = useForm<TForm>({
		mode: 'onTouched',
		reValidateMode: 'onChange',
		resolver: validationSchema ? yupResolver(validationSchema) : undefined,
		delayError: 150,
		defaultValues,
	});

	const handleSubmit = (e: FormEvent) => {
		methods.handleSubmit(onSubmit)(e);
		if (reset) methods.reset();
	};

	return (
		<FormProvider {...methods}>
			<form onSubmit={handleSubmit}>{children}</form>
		</FormProvider>
	);
};

export default BaseForm;
