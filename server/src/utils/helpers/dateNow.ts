const monthNames = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

export const dateNow = () => {
	const date = new Date();
	const day = date.getDate();
	const month = monthNames[date.getMonth()];
	const year = date.getFullYear();
	return `${month} ${day}, ${year}`;
};
