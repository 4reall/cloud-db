import Header from 'components/Header/Header';
import { Outlet } from 'react-router-dom';
import Breadcrumbs from 'components/_ui/Breadcrumbs';
import Footer from 'components/Footer';

const Layout = () => {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
};

export default Layout;
