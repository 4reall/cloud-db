const Header = () => {
	return (
		<div className="grid grid-cols-12 p-2 text-black dark:text-gray-200">
			<span className="col-span-2 text-center">Title</span>
			<span className="col-span-2 col-end-11 text-center">Date</span>
			<span className="col-span-1 col-end-13 text-center">Size</span>
		</div>
	);
};

export default Header;
