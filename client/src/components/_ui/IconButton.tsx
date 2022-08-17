import { ReactNode } from 'react';

interface IconOptionProps {
	icon: ReactNode;
	label: string;
	onClick?: () => void;
}

const IconButton = ({ icon, label, onClick }: IconOptionProps) => {
	return (
		<button onClick={onClick} className="flex w-full items-end">
			<div className="mr-2 inline-block h-6 w-6">{icon}</div>
			<span className="text-sm uppercase">{label}</span>
		</button>
	);
};

export default IconButton;
