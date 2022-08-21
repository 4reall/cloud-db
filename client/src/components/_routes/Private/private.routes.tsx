import { PathsEnum } from 'utils/constants/paths';
import DiskPage from 'pages/Disk/DiskPage';
import { Navigate } from 'react-router-dom';

export const privateRoutes = [
	{ path: PathsEnum.Disk, component: <DiskPage /> },
	{
		path: PathsEnum.Auth,
		component: <Navigate to={PathsEnum.Disk} replace={true} />,
	},
];
