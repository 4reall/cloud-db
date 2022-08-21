import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';

import Button from 'components/_ui/Button';
import InputField from 'components/_forms/Input.field';

import { useLoginUserMutation } from 'api/endpoints/auth.endpoints';
import { loginValidation } from 'components/_forms/Login/login.validation';
import { PathsEnum } from 'utils/constants/paths';
import BaseForm from 'components/_forms/Base.form';
import { isFetchBaseQueryError } from 'utils/helpers/validateError';

export interface ILoginForm {
	email: string;
	password: string;
}

interface RegistrationFormProps {
	big?: boolean;
}

const LoginForm = ({ big }: RegistrationFormProps) => {
	const navigate = useNavigate();
	const [errMsg, setErrMsg] = useState('');

	const [loginUser, { isLoading, error, isSuccess }] = useLoginUserMutation();

	const onSubmit = (data: ILoginForm) => {
		loginUser(data);
	};

	useEffect(() => {
		if (isSuccess) {
			navigate(PathsEnum.Disk, { replace: true });
		}
		if (isFetchBaseQueryError(error) && error.status === 400) {
			setErrMsg('Wrong password or email');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading]);

	return (
		<BaseForm<ILoginForm>
			validationSchema={loginValidation}
			onSubmit={onSubmit}
		>
			<InputField<ILoginForm>
				name="email"
				label="E-mail"
				big={big}
				type="email"
			/>
			<InputField<ILoginForm>
				name="password"
				label="Password"
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

export default LoginForm;
