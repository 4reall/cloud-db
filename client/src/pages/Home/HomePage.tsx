import Page from 'components/_layout/Page';
import GridItem, { CardProps } from 'pages/Home/components/GridItem';
import { ReactComponent as Nodejs } from 'assets/icons/Nodejs.svg';
import { ReactComponent as Tailwindcss } from 'assets/icons/Tailwindcss.svg';
import { ReactComponent as Expressjs } from 'assets/icons/Expressjs.svg';
import { ReactComponent as React } from 'assets/icons/React.svg';
import { ReactComponent as Redux } from 'assets/icons/Redux.svg';
import Grid from 'pages/Home/components/Grid';

const cards: CardProps[] = [
	{
		icon: <Nodejs />,
		title: 'Node.js',
	},
	{
		icon: <Expressjs />,
		title: 'Express.js',
	},
	{
		icon: <React />,
		title: 'React.js',
	},
	{
		icon: <Tailwindcss />,
		title: 'Tailwindcss',
	},
	{
		icon: <Redux />,
		title: 'Redux',
	},
];

const HomePage = () => {
	return (
		<Page>
			<h1 className="mb-6 text-center text-2xl font-semibold capitalize text-gray-800 dark:text-white lg:text-3xl">
				<span className="underline decoration-blue-700 dark:decoration-blue-500">
					Technologies
				</span>{' '}
				used for creating this app.
			</h1>
			<Grid>
				{cards.map((card) => (
					<GridItem {...card} />
				))}
			</Grid>
		</Page>
	);
};

export default HomePage;
