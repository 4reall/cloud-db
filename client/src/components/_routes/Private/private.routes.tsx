import { PathsEnum } from 'utils/constants/paths';
import MainPage from 'pages/Main/MainPage';
import { Navigate } from 'react-router-dom';

export const privateRoutes = [
	{ path: PathsEnum.Disk, component: <MainPage /> },
	{
		path: PathsEnum.Auth,
		component: <Navigate to={PathsEnum.Disk} replace={true} />,
	},
];
