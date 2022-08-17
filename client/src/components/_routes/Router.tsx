import { Route, Routes } from 'react-router-dom';
import HomePage from 'pages/Home/HomePage';
import { PathsEnum } from 'utils/constants/paths';
import RequireUser from 'components/_routes/RequireUser';
import MainPage from 'pages/Main/MainPage';
import AuthPage from 'pages/Auth/Auth.page';
import Layout from 'components/_layout/Layout';
import Page404 from 'pages/Page404/Page404';
import ProfilePage from 'pages/Profile/ProfilePage';

const Router = () => {
	return (
		<Routes>
			<Route path={PathsEnum.Home} element={<Layout />}>
				<Route index element={<HomePage />} />

				<Route element={<RequireUser />}>
					<Route path={PathsEnum.Disk} element={<MainPage />} />
				</Route>
				<Route element={<RequireUser />}>
					<Route path={PathsEnum.Profile} element={<ProfilePage />} />
				</Route>
				<Route path={PathsEnum.Auth} element={<AuthPage />} />
			</Route>
			<Route path={PathsEnum.NotFound} element={<Page404 />} />
		</Routes>
	);
};

export default Router;
