import { Route, Routes } from 'react-router-dom';
import { publicRoutes } from './public.routes';

const PublicRouter = () => {
	return (
		<Routes>
			{publicRoutes.map(({ path, component }, i) => (
				<Route key={path + i} path={path} element={component} />
			))}
		</Routes>
	);
};

export default PublicRouter;
