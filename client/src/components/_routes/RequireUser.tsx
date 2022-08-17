import { useAuthUserQuery } from 'api/endpoints/auth.endpoints';
import Progress from 'components/_loaders/Progress';
import { useAppSelector } from 'hooks/useAppSelector';
import { Navigate, Outlet } from 'react-router-dom';
import { PathsEnum } from 'utils/constants/paths';

const RequireUser = () => {
	const { isLoading, isFetching, isSuccess } = useAuthUserQuery(null);
	const isAuth = useAppSelector((state) => state.user.isAuth);

	const token = localStorage.getItem('token');
	const loading = isLoading || isFetching;

	if (loading) return <Progress />;

	return (token && isSuccess) || isAuth ? (
		<Outlet />
	) : (
		<Navigate to={PathsEnum.Auth} replace />
	);
};

export default RequireUser;
