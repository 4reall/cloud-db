import { createPortal } from 'react-dom';
import { ReactNode, useEffect, useState } from 'react';

interface PortalProps {
	children: ReactNode;
}

const Portal = ({ children }: PortalProps) => {
	const [container] = useState<HTMLElement>(() =>
		document.createElement('div')
	);

	useEffect(() => {
		document.body.append(container);
		return () => {
			document.body.removeChild(container);
		};
	}, []);

	return createPortal(children, container);
};

export default Portal;
