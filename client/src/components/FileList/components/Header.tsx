const Header = () => {
	return (
		<div className="grid grid-cols-12 p-2 text-sm text-black dark:text-gray-200 md:text-base">
			<span className="col-start-2 text-center">Title</span>
			<span className="col-start-7 col-end-10 hidden text-center md:block">
				Date
			</span>
			<span className="col-start-8 col-end-11 text-center md:col-start-10 md:col-end-12">
				Size
			</span>
		</div>
	);
};

export default Header;
