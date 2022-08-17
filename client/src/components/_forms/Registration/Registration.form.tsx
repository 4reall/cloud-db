import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';

import Button from 'components/_ui/Button';
import Input from 'components/_ui/Input';

import { useRegisterUserMutation } from 'api/endpoints/auth.endpoints';
import { registrationSchema } from 'components/_forms/Registration/registration.validation';

export interface IRegistrationForm {
	email: string;
	password: string;
	confirmPassword: string;
}

interface RegistrationFormProps {
	big?: boolean;
}

const RegistrationForm = ({ big }: RegistrationFormProps) => {
	const methods = useForm<IRegistrationForm>({
		mode: 'onTouched',
		reValidateMode: 'onChange',
		resolver: yupResolver(registrationSchema),
	});

	const { handleSubmit } = methods;

	const [registerUser, { error, isError }] = useRegisterUserMutation();

	const onSubmit = (data: IRegistrationForm) =>
		registerUser({ email: data.email, password: data.password });

	if (isError) {
		console.log(error);
	}

	return (
		<FormProvider {...methods}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input<IRegistrationForm>
					label="E-mail"
					name="email"
					big={big}
				/>
				<Input<IRegistrationForm>
					label="Password"
					name="password"
					big={big}
					type="password"
				/>
				<Input<IRegistrationForm>
					label="Confirm password"
					name="confirmPassword"
					big={big}
					type="password"
				/>
				<Button
					className={clsx('mt-6 w-full', big && 'mt-8')}
					big={big}
					type="submit"
					ripple
				>
					Sing up
				</Button>
			</form>
		</FormProvider>
	);
};

export default RegistrationForm;
