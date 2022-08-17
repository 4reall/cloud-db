import { PathsEnum } from 'utils/constants/paths';
import AuthPage from 'pages/Auth/Auth.page';
import { Navigate } from 'react-router-dom';

export const publicRoutes = [
	{ path: PathsEnum.Auth, component: <AuthPage /> },
	{ path: PathsEnum.NotFound, component: <Navigate to={PathsEnum.Auth} /> },
];
