import { ReactNode } from 'react';

export interface CardProps {
	icon: ReactNode;
	title: string;
}

const GridItem = ({ icon, title }: CardProps) => {
	return (
		<div className="col-span-6 md:col-span-4">
			<div className="child:min-w-16 mx-auto flex justify-center child:max-h-16">
				{icon}
			</div>
			<h3 className="mt-4 w-full text-center text-2xl font-semibold text-gray-700 first-letter:capitalize dark:text-white">
				{title}
			</h3>
		</div>
	);
};

export default GridItem;
