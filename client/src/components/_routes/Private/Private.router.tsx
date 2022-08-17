import { Route, Routes } from 'react-router-dom';
import { privateRoutes } from 'components/_routes/Private/private.routes';

const PrivateRouter = () => {
	return (
		<Routes>
			{privateRoutes.map(({ path, component }, i) => (
				<Route key={path + i} path={path} element={component} />
			))}
		</Routes>
	);
};

export default PrivateRouter;
