import { PropsWithChildren } from 'react';
import clsx from 'clsx';

import Container from 'components/_layout/Container';

interface PageProps {
	className?: string;
}

const Page = ({ className, children }: PropsWithChildren<PageProps>) => {
	return (
		<main className="flex-1 pt-[80px]">
			<Container className={clsx(className, 'p-8')}>{children}</Container>
		</main>
	);
};

export default Page;
