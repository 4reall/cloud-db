import Dropdown from 'components/_ui/Dropdown/Dropdown';
import IconButton from 'components/_ui/IconButton';
import { FolderAddIcon, FolderRemoveIcon } from '@heroicons/react/outline';
import {
	MouseEvent,
	PropsWithChildren,
	useEffect,
	useRef,
	useState,
} from 'react';
import { useClickOutside } from 'hooks/useClickOutside';

const ContextMenu = ({ children }: PropsWithChildren<{}>) => {
	const [dropdown, setDropdown] = useState(false);
	const [pos, setPos] = useState({ x: 0, y: 0 });
	const [align, setAlign] = useState<'left' | 'right' | 'center'>('left');
	const containerRef = useRef<HTMLDivElement>(null);
	const innerRef = useRef<HTMLDivElement>(null);

	useClickOutside(innerRef, () => setDropdown(false));

	const openDropdown = () => {
		setDropdown(true);
	};
	const closeDropdown = () => {
		setDropdown(false);
	};

	const handleToggle = (e: MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		const containerSize = e.currentTarget.getBoundingClientRect();
		const innerSize = innerRef.current?.getBoundingClientRect();

		if (!innerSize || e.target !== e.currentTarget) return;

		const curX = e.clientX - containerSize.x - innerSize.width;
		const curY = e.clientY - containerSize.y - innerSize.height;

		setDropdown((state) => false);
		setTimeout(() => {
			setDropdown(true);
			setPos({ x: curX, y: curY });
			if (curX > (3 / 4) * containerSize.width) {
				setAlign('right');
			} else if (curX < containerSize.width / 4) {
				setAlign('left');
			} else {
				setAlign('center');
			}
		}, 100);
	};

	return (
		<div
			ref={containerRef}
			onContextMenu={handleToggle}
			className="absolute top-0 right-0 bottom-0 left-0 select-none"
		>
			<div
				ref={innerRef}
				className="absolute bg-black"
				style={{ top: pos.y, left: pos.x }}
				onClick={() => setDropdown(false)}
			>
				<Dropdown isOpen={dropdown} align={align}>
					{children}
				</Dropdown>
			</div>
		</div>
	);
};

export default ContextMenu;
