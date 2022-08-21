import Header from 'components/Header/Header';
import { Outlet } from 'react-router-dom';
import Breadcrumbs from 'components/_ui/Breadcrumbs/Breadcrumbs';

const Layout = () => {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
};

export default Layout;
