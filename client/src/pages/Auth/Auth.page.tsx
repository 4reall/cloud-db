import { useState } from 'react';
import clsx from 'clsx';

import LoginForm from 'components/_forms/Login/Login.form';
import RegistrationForm from 'components/_forms/Registration/Registration.form';
import Page from 'components/_layout/Page';

import useMediaQuery from 'hooks/useMediaQuery';
import { queries } from 'utils/constants/queries';

const before = clsx(
	'before:absolute before:bottom-0 before:rounded before:bg-blue-700',
	'before:h-1 before:w-full before:rounded-xl'
);

const AuthPage = () => {
	const [active, setActive] = useState<'login' | 'register'>('login');
	const isMd = useMediaQuery(queries.up.md);

	const handleClick = (active: 'login' | 'register') => {
		return () => setActive(active);
	};

	return (
		<Page>
			<div
				className={clsx(
					'mx-auto flex h-fit max-w-[20rem] flex-grow-0 flex-col',
					'rounded-md bg-white p-8 shadow-md dark:bg-gray-800',
					'md:max-w-[30rem]'
				)}
			>
				<div
					className={clsx(
						'mx-auto mb-4 flex w-2/3 items-center justify-between md:w-1/2',
						'text-black dark:text-white'
					)}
				>
					<button
						onClick={handleClick('login')}
						className={clsx(
							'relative inline-block py-2 text-2xl font-bold',
							active === 'login' && before
						)}
					>
						Sing in
					</button>
					<button
						onClick={handleClick('register')}
						className={clsx(
							'relative inline-block appearance-none py-2 text-2xl font-bold',
							'',
							active === 'register' && before
						)}
					>
						Sing up
					</button>
				</div>
				{active === 'login' ? (
					<LoginForm big={isMd} />
				) : (
					<RegistrationForm big={isMd} />
				)}
			</div>
		</Page>
	);
};

export default AuthPage;
