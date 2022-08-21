import React, { useState, MouseEvent } from 'react';
import { useDebouncedRippleCleanUp } from './useDebouncedRippleCleanUp';
import clsx from 'clsx';

const DURATION = 1000;

export interface RippleItemProps {
	x: number;
	y: number;
	size: number;
}

const Ripple = () => {
	const [rippleArray, setRippleArray] = useState<RippleItemProps[]>([]);

	useDebouncedRippleCleanUp(rippleArray.length, DURATION, () => {
		setRippleArray([]);
	});

	const addRipple = (event: MouseEvent) => {
		const rippleContainer = event.currentTarget.getBoundingClientRect();
		const size =
			rippleContainer.width > rippleContainer.height
				? rippleContainer.width
				: rippleContainer.height;
		const x = event.clientX - rippleContainer.x - size / 2;
		const y = event.clientY - rippleContainer.y - size / 2;
		const newRipple = {
			x,
			y,
			size,
		};

		setRippleArray([...rippleArray, newRipple]);
	};

	return (
		<div
			className={`absolute top-0 left-0 right-0 bottom-0 z-10 overflow-hidden`}
			onMouseDown={addRipple}
		>
			{rippleArray.length > 0 &&
				rippleArray.map((ripple, index) => {
					return (
						<span
							className={clsx(
								'absolute scale-0 animate-[ripple] rounded-full',
								'bg-black dark:bg-white'
							)}
							key={'span' + index}
							style={{
								animationDuration: DURATION + 'ms',
								filter: 'opacity(0.3)',
								top: ripple.y,
								left: ripple.x,
								width: ripple.size,
								height: ripple.size,
							}}
						/>
					);
				})}
		</div>
	);
};

export default Ripple;
