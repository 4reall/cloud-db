import Router from 'components/_routes/Router';

import { useDarkMode } from 'hooks/useDarkMode';

const App = () => {
	useDarkMode();
	return (
		<div className="min-h-screen bg-gray-200 dark:bg-gray-400">
			<Router />
		</div>
	);
};

export default App;
