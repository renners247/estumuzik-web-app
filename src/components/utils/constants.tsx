export const latestWinners = [
	{
		game: "Daily Dream...",
		winner: "090*****945",
		cashout: "₦300,000",
	},
	{
		game: "Trivia Lotto",
		winner: "090*****945",
		cashout: "₦300,000",
	},
	{
		game: "2 Sure",
		winner: "090*****945",
		cashout: "₦300,000",
	},
	{
		game: "Daily Dream...",
		winner: "090*****945",
		cashout: "₦300,000",
	},
	{
		game: "Quick Match",
		winner: "090*****945",
		cashout: "₦300,000",
	},
	{
		game: "Quick Match",
		winner: "090*****945",
		cashout: "₦300,000",
	},
	{
		game: "Quick Match",
		winner: "090*****945",
		cashout: "₦300,000",
	},
	{
		game: "Quick Match",
		winner: "090*****945",
		cashout: "₦300,000",
	},
	{
		game: "Quick Match",
		winner: "090*****945",
		cashout: "₦300,000",
	},
];

export const formatDuration = (seconds: number): string => {
	const hours = Math.floor(seconds / 3600);
	const remainingMinutes = Math.floor((seconds % 3600) / 60);
	const remainingSeconds = seconds % 60;

	const formatNumber = (
		num: number,
		singular: string,
		plural: string,
	): string => `${num} ${num === 1 ? singular : plural}`;

	const formattedHours = hours > 0 ? formatNumber(hours, "hour", "hours") : "";
	const formattedMinutes =
		remainingMinutes > 0
			? formatNumber(remainingMinutes, "minute", "minutes")
			: "";
	const formattedSeconds =
		remainingSeconds > 0
			? formatNumber(remainingSeconds, "second", "seconds")
			: "";

	const parts = [formattedHours, formattedMinutes, formattedSeconds].filter(
		Boolean,
	);

	return parts.join(" - ");
};

export function formatDateYMD(dateString: string) {
	const date = new Date(dateString);
	const formattedDate = date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
	return formattedDate; // Returns the formatted date string
}
