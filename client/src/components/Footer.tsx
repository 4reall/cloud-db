import Container from 'components/_layout/Container';

import { ReactComponent as GithubIcon } from 'assets/icons/Github.svg';
import { ReactComponent as Telegram } from 'assets/icons/Telegram.svg';
import clsx from 'clsx';
import SocialLink from 'components/_ui/SocialLink';
import { MailIcon } from '@heroicons/react/solid';
import Divider from 'components/_layout/Divider';

const Footer = () => {
	const handleClick = (href: string) => (e: MouseEvent) => {
		e.preventDefault();
		window.location.href = href;
	};
	return (
		<footer className="bg-white shadow dark:bg-gray-800">
			<Container className="flex flex-col items-center justify-center px-6 py-4">
				<div className="flex w-32 items-center justify-between">
					<SocialLink href="mailto:dmitriiprovotorovav@gmail.com">
						<MailIcon
							className={clsx(
								'transition-color duration-300 dark:text-gray-200 md:hover:text-blue-700 md:dark:hover:text-white',
								'h-6 w-6 md:h-8 md:w-8'
							)}
						/>
					</SocialLink>
					<SocialLink href="https://github.com/4reall">
						<GithubIcon
							className={clsx(
								'transition-color duration-300 dark:text-gray-200 md:hover:text-blue-700 md:dark:hover:text-white',
								'h-6 w-6 md:h-8 md:w-8'
							)}
						/>
					</SocialLink>
					<SocialLink href="https://t.me/D4_Real">
						<Telegram
							className={clsx(
								'transition-color duration-300 dark:text-gray-200 md:hover:text-blue-700 md:dark:hover:text-white',
								'h-6 w-6 md:h-8 md:w-8'
							)}
						/>
					</SocialLink>
				</div>
				<Divider
					width="9rem"
					align="horizontal"
					className="mt-3 mb-2 w-44"
				/>
				<span className="text-sm font-thin italic dark:text-gray-200 md:text-base">
					© Created by 4reall
				</span>
			</Container>
		</footer>
	);
};

export default Footer;
