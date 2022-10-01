import Select, { Option } from 'components/_ui/Select';
import useMediaQuery from 'hooks/useMediaQuery';
import { queries } from 'utils/constants/queries';

const sortOptions: Option[] = [
	{ id: 1, name: 'type' },
	{ id: 2, name: 'name' },
	{ id: 3, name: 'size' },
];

const SearchPanel = () => {
	const isSm = useMediaQuery(queries.down.md);

	return (
		<div className="py-4 px-8">
			<Select options={sortOptions} size={isSm ? 'sm' : 'md'} />
		</div>
	);
};

export default SearchPanel;
