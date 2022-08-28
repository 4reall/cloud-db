import Router from 'components/_routes/Router';

import { useDarkMode } from 'hooks/useDarkMode';

const App = () => {
	useDarkMode();
	return (
		<div className="flex min-h-screen flex-col bg-gray-200 dark:bg-gray-600">
			<Router />
		</div>
	);
};

export default App;
