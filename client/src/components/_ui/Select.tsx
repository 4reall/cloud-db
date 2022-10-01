import { Listbox, Transition } from '@headlessui/react';
import { ComponentPropsWithoutRef, ReactNode, useState } from 'react';
import clsx from 'clsx';
import { ReactComponent as ChevronUpDown } from 'assets/icons/ChevronUpDown.svg';

export interface Option {
	id: number;
	name: string;
}

const sizeMap = {
	md: {
		text: '',
		spacing: 'py-1 pl-4 pr-10',
		border: 'focus-visible:ring-2',
	},
	sm: {
		text: 'text-sm',
		spacing: 'py-1 pl-3 pr-7',
		border: 'focus-visible:ring-1',
	},
};

interface SelectOwnProps {
	options: Option[];
	size?: keyof typeof sizeMap;
}

type SelectProps = SelectOwnProps &
	Omit<ComponentPropsWithoutRef<'select'>, 'size'>;

const Select = ({ options, size = 'md', ...props }: SelectProps) => {
	const [selected, setSelected] = useState(options[0].name);
	return (
		<Listbox
			as="div"
			className="relative"
			onChange={(option) => setSelected(option)}
			value={selected}
		>
			<Listbox.Button
				className={clsx(
					'relative w-full rounded-md bg-white shadow-lg',
					'cursor-default text-left focus:outline-none focus:ring-blue-700',
					sizeMap[size].border,
					sizeMap[size].spacing,
					sizeMap[size].text
				)}
			>
				{selected}
				<ChevronUpDown className="absolute right-1 top-1/2 h-5 w-5 -translate-y-1/2" />
			</Listbox.Button>
			<Transition
				className="absolute z-10 mt-1 w-full"
				enter="transition duration-100 ease-out"
				enterFrom="transform scale-95 opacity-0"
				enterTo="transform scale-100 opacity-100"
				leave="transition duration-75 ease-out"
				leaveFrom="transform scale-100 opacity-100"
				leaveTo="transform scale-95 opacity-0"
			>
				<Listbox.Options
					className={clsx(
						'max-h-56 rounded-md rounded-md bg-white py-1 text-base shadow-lg',
						'overflow-auto ring-1 ring-black ring-opacity-5 focus:outline-none',
						sizeMap[size].border
					)}
				>
					{options.map(({ id, name }) => (
						<Listbox.Option
							className={clsx(
								'base__color base__color_hover base__bg_hover relative',
								sizeMap[size].spacing,
								sizeMap[size].text
							)}
							key={id}
							value={name}
						>
							{name}
						</Listbox.Option>
					))}
				</Listbox.Options>
			</Transition>
		</Listbox>
	);
};

export default Select;
