import { useAuthUserQuery } from 'api/endpoints/auth.endpoints';
import Progress from 'components/_ui/Progress';
import { Navigate, Outlet } from 'react-router-dom';
import { PathsEnum } from 'utils/constants/paths';
import { useAppSelector } from 'hooks/redux';

const RequireUser = () => {
	const isAuth = useAppSelector((state) => state.user.isAuth);
	const { isLoading, isFetching, isSuccess } = useAuthUserQuery(null, {
		skip: isAuth,
	});

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
