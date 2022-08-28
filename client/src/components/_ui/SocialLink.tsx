import { Link } from 'react-router-dom';
import { PropsWithChildren, MouseEvent } from 'react';

interface SocialLinkProps {
	href: string;
	className?: string;
}

const SocialLink = ({
	children,
	href,
	className,
}: PropsWithChildren<SocialLinkProps>) => {
	const handleClick = (e: MouseEvent) => {
		e.preventDefault();
		window.open(href);
	};

	return (
		<Link to="#" onClick={handleClick} className={className}>
			{children}
		</Link>
	);
};

export default SocialLink;
