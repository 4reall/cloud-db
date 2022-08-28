import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import Button from 'components/_ui/_buttons/Button';
import { PathsEnum } from 'utils/constants/paths';
import Page from 'components/_layout/Page';

const Page404 = () => {
	const navigate = useNavigate();
	const handleBack = () => {
		navigate(PathsEnum.Home, { replace: true });
	};

	return (
		<Page>
			<section>
				<div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
					<div className="max-w-md text-center">
						<h2 className="mb-8 text-9xl font-extrabold dark:text-blue-700">
							<span className="sr-only">Error</span>404
						</h2>
						<p className="text-2xl font-semibold dark:text-gray-200 md:text-3xl">
							Sorry, we couldn't find this page.
						</p>
						<p className="mt-4 mb-8 dark:text-gray-200">
							But dont worry, you can find plenty of other things
							on our homepage.
						</p>
						<Button onClick={handleBack}>Back to homepage</Button>
					</div>
				</div>
			</section>
		</Page>
	);
};

export default Page404;
