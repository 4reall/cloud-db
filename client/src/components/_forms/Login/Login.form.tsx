import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';

import Button from 'components/_ui/Button';
import Input from 'components/_ui/Input';

import { useLoginUserMutation } from 'api/endpoints/auth.endpoints';
import { validateFetchError } from 'utils/helpers/validateError';
import { loginValidation } from 'components/_forms/Login/login.validation';
import { PathsEnum } from 'utils/constants/paths';
import ValidationError from 'components/_errors/ValidationError';

export interface ILoginForm {
	email: string;
	password: string;
}

interface RegistrationFormProps {
	big?: boolean;
}

const LoginForm = ({ big }: RegistrationFormProps) => {
	const methods = useForm<ILoginForm>({
		mode: 'onTouched',
		reValidateMode: 'onChange',
		resolver: yupResolver(loginValidation),
	});
	const { handleSubmit } = methods;

	const navigate = useNavigate();
	const [errorMes, setErrorMes] = useState('');

	const [loginUser, { isLoading, error, isSuccess }] = useLoginUserMutation();

	const onSubmit = (data: ILoginForm) => {
		loginUser(data);
	};

	useEffect(() => {
		if (isSuccess) {
			navigate(PathsEnum.Disk, { replace: true });
		}
		if (validateFetchError(error)?.status === 400) {
			setErrorMes('Wrong password or email');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading]);

	return (
		<FormProvider {...methods}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input<ILoginForm>
					name="email"
					label="E-mail"
					big={big}
					type="email"
				/>
				<Input<ILoginForm>
					name="password"
					label="Password"
					big={big}
					type="password"
				/>
				<ValidationError message={errorMes} big={big} />
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

export default LoginForm;
