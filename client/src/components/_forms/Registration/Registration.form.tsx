import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';

import Button from 'components/_ui/Button';
import InputField from 'components/_forms/Input.field';

import { useRegisterUserMutation } from 'api/endpoints/auth.endpoints';
import { registrationSchema } from 'components/_forms/Registration/registration.validation';
import BaseForm from 'components/_forms/Base.form';
import {
	isErrorWithMessage,
	isFetchBaseQueryError,
} from 'utils/helpers/validateError';

export interface IRegistrationForm {
	email: string;
	password: string;
	confirmPassword: string;
}

interface RegistrationFormProps {
	big?: boolean;
}

const RegistrationForm = ({ big }: RegistrationFormProps) => {
	const [registerUser, { error, isError }] = useRegisterUserMutation();

	const errMsg = isErrorWithMessage(error) ? error.data.message : '';

	const onSubmit = (data: IRegistrationForm) =>
		registerUser({ email: data.email, password: data.password });

	return (
		<BaseForm<IRegistrationForm>
			onSubmit={onSubmit}
			validationSchema={registrationSchema}
		>
			<InputField<IRegistrationForm>
				label="E-mail"
				name="email"
				big={big}
			/>
			<InputField<IRegistrationForm>
				label="Password"
				name="password"
				big={big}
				type="password"
			/>
			<InputField<IRegistrationForm>
				label="Confirm password"
				name="confirmPassword"
				big={big}
				type="password"
				customError={errMsg}
			/>
			<Button
				className={clsx('mt-6 w-full', big && 'mt-8')}
				big={big}
				type="submit"
				ripple
			>
				Sing up
			</Button>
		</BaseForm>
	);
};

export default RegistrationForm;
