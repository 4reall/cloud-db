import { Children, PropsWithChildren } from 'react';

const Grid = ({ children }: PropsWithChildren<{}>) => {
	return <div className="grid grid-cols-12 gap-x-4 gap-y-6">{children}</div>;
};

export default Grid;
